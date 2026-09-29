"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useAdminTab } from "../layout";
import { moveItem } from "@/lib/sort";

// Admin CMS. One screen with tabs (Projects, Blog, Skills, Experience,
// Settings). Each tab is a "manager": it lists rows, lets you add/edit
// via a form, and calls the matching /api/<resource> endpoint. The
// shared CRUD helpers at the bottom do the actual HTTP work.

export default function AdminDashboard() {
  const { tab } = useAdminTab();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <SeedButton />
      </div>

      {tab === "projects" && (
        <CrudManager resource="projects" title="Project" addLabel="+ Add Project" listField="name" subField="date"
          fields={[
            { key: "name", label: "Name", required: true },
            { key: "date", label: "Date", required: true },
            { key: "description", label: "Description", as: "textarea" },
            { key: "image", label: "Image path", required: true },
            { key: "preview", label: "Preview URL", required: true },
            { key: "link_source", label: "Source URL", required: true },
          ]}
        />
      )}
      {tab === "blog" && (
        <CrudManager resource="blog" title="Post" addLabel="+ Add Post" listField="title" subField="category"
          lines={{ key: "content", label: "Content (paragraphs)", addLabel: "+ Add paragraph" }}
          fields={[
            { key: "title", label: "Title", required: true },
            { key: "slug", label: "Slug", required: true },
            { key: "category", label: "Category", required: true },
            { key: "summary", label: "Summary", as: "textarea", required: true },
            { key: "published_at", label: "Published At", type: "date", required: true },
            { key: "read_time", label: "Read Time", required: true },
            { key: "cover", label: "Cover image", required: true },
          ]}
        />
      )}
      {tab === "skills" && (
        <CrudManager resource="skills" title="Skill" addLabel="+ Add Skill" listField="name"
          fields={[
            { key: "name", label: "Name", required: true },
            { key: "link", label: "Link (URL)", required: true },
            { key: "image", label: "Image URL", required: true },
          ]}
        />
      )}
      {tab === "experience" && (
        <CrudManager resource="experiences" title="Experience" addLabel="+ Add Experience" listField="role" subField="company"
          lines={{ key: "highlights", label: "Highlights", addLabel: "+ Add highlight" }}
          fields={[
            { key: "company", label: "Company", required: true },
            { key: "role", label: "Role", required: true },
            { key: "period", label: "Period", required: true },
            { key: "location", label: "Location", required: true },
          ]}
        />
      )}
      {tab === "modules" && <ModulesManager />}
      {tab === "settings" && <SettingsManager />}
    </div>
  );
}

// ─── Seed ────────────────────────────────────────────────────────

function SeedButton() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const seed = async () => {
    if (!confirm("Seed static data into empty tables?")) return;
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Seed failed");
      const seeded = data.seeded || {};
      const parts = Object.entries(seeded).map(([k, v]) => `${k}: ${v}`);
      setStatus(parts.length ? `Seeded — ${parts.join(", ")}` : "Nothing to seed (tables not empty)");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Seed failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {status && <span className="text-xs text-muted-foreground">{status}</span>}
      <button
        onClick={seed}
        disabled={loading}
        className="rounded-lg border border-border/60 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/40 disabled:opacity-50"
      >
        {loading ? "Seeding..." : "Seed data"}
      </button>
    </div>
  );
}

// ─── Shared CRUD helpers ─────────────────────────────────────────
// Every manager below saves to the same kind of REST endpoint and
// deletes by id. Keeping that fetch plumbing here means each manager
// only says WHAT it saves, not HOW it talks to the API.

async function saveRecord(resource: string, id: string | undefined, body: unknown) {
  const res = await fetch(id ? `/api/${resource}/${id}` : `/api/${resource}`, {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error || `Request failed (${res.status})`);
  }
  return res.json();
}

async function deleteRecord(resource: string, id: string) {
  await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
}

async function saveOrder(resource: string, ids: string[]) {
  const res = await fetch("/api/sort", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resource, ids }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Sorting failed");
}

// ponytail: one place to change API error shape; alerts kept simple on purpose
function saveFailed(e: unknown) {
  alert(e instanceof Error ? e.message : "Save failed");
}

// Shared styling so every panel/button looks the same without repeating classes.
const cardCls = "rounded-2xl border border-border/60 bg-card p-6 shadow-sm";
const primaryBtn = "rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50";
const ghostBtn = "rounded-lg border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";
const saveBtn = "rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50";
const linkBtn = "text-xs text-muted-foreground transition-colors hover:text-foreground";
const delBtn = "text-xs text-red-400 transition-colors hover:text-red-500";
const inputCls = "rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground";

// ─── Manager Components ───────────────────────────────────────────

// One manager drives Projects, Skills, Blog and Experience. Each is just a
// config: which API resource, which fields, and (optionally) a list-of-lines
// editor like a post's paragraphs or an experience's highlights.
type FieldDef = { key: string; label: string; required?: boolean; as?: "textarea"; type?: string };

function CrudManager({
  resource, title, addLabel, listField, subField, fields, lines,
}: {
  resource: string;
  title: string; // singular, e.g. "Post"
  addLabel: string;
  listField: string;
  subField?: string;
  fields: FieldDef[];
  lines?: { key: string; label: string; addLabel: string };
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [lineValues, setLineValues] = useState<string[]>([""]);
  const [sorting, setSorting] = useState(false);
  const draggedId = useRef<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/${resource}`);
    setItems(await res.json());
    setLoading(false);
  }, [resource]);
  useEffect(() => { load(); }, [load]);

  const startEdit = (item: any = {}) => {
    setEditing(item);
    setForm(item);
    if (lines) setLineValues(item?.[lines.key] || [""]);
  };

  const save = async () => {
    setSaving(true);
    // Drop DB-owned fields; attach the line editor's values if present.
    const { id, created_at, updated_at, ...rest } = form;
    const body: any = { ...rest };
    if (lines) body[lines.key] = lineValues.filter(Boolean);
    try {
      await saveRecord(resource, editing?.id, body);
      setEditing(null);
      load();
    } catch (e) {
      saveFailed(e);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(`Delete this ${title.toLowerCase()}?`)) return;
    await deleteRecord(resource, id);
    load();
  };

  const reorder = async (sourceId: string, targetId: string) => {
    if (sorting) return;
    const next = moveItem(items, sourceId, targetId);
    if (next === items) return;
    setItems(next);
    setSorting(true);
    try {
      await saveOrder(resource, next.map((item) => item.id));
    } catch (e) {
      setItems(items);
      saveFailed(e);
    } finally {
      setSorting(false);
    }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  if (editing !== null) {
    return (
      <div className={cardCls}>
        <h2 className="text-lg font-semibold text-foreground">
          {editing.id ? `Edit ${title}` : `New ${title}`}
        </h2>
        <div className="mt-4 space-y-4">
          {fields.map((f) => (
            <Field
              key={f.key}
              label={f.label}
              value={form[f.key] || ""}
              onChange={(v) => setForm({ ...form, [f.key]: v })}
              as={f.as}
              type={f.type}
              required={f.required}
            />
          ))}
          {lines && (
            <LineEditor
              label={lines.label}
              addLabel={lines.addLabel}
              values={lineValues}
              setValues={setLineValues}
            />
          )}
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setEditing(null)} className={ghostBtn}>Cancel</button>
          <button onClick={save} disabled={saving} className={saveBtn}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cardCls}>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} {title.toLowerCase()}s{items.length > 1 && " · Drag ⠿ or use arrows to reorder"}</p>
        <button onClick={() => startEdit()} className={primaryBtn}>{addLabel}</button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.id} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); if (draggedId.current) reorder(draggedId.current, item.id); draggedId.current = null; }} className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
            <button type="button" draggable={!sorting} onDragStart={(e) => { draggedId.current = item.id; e.dataTransfer.effectAllowed = "move"; }} onDragEnd={() => { draggedId.current = null; }} aria-label={`Drag ${item[listField]} to reorder`} className="cursor-grab select-none text-lg text-muted-foreground active:cursor-grabbing">⠿</button>
            <div>
              <p className="text-sm font-medium text-foreground">{item[listField]}</p>
              {subField && <p className="text-xs text-muted-foreground">{item[subField]}</p>}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" onClick={() => reorder(item.id, items[index - 1].id)} disabled={sorting || index === 0} aria-label={`Move ${item[listField]} up`} className={`${linkBtn} disabled:opacity-30`}>↑</button>
              <button type="button" onClick={() => reorder(item.id, items[index + 1].id)} disabled={sorting || index === items.length - 1} aria-label={`Move ${item[listField]} down`} className={`${linkBtn} disabled:opacity-30`}>↓</button>
              <button onClick={() => startEdit(item)} className={linkBtn}>Edit</button>
              <button onClick={() => remove(item.id)} className={delBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModulesManager() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPage, setNewPage] = useState("");
  const [newSection, setNewSection] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [sorting, setSorting] = useState(false);
  const draggedId = useRef<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/page-modules");
    setModules(await res.json());
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  // Flip a section's visibility and persist it right away.
  const toggle = async (m: any, visible: boolean) => {
    setModules((prev) => prev.map((x) => (x.id === m.id ? { ...x, visible } : x)));
    try {
      await saveRecord("page-modules", m.id, { visible });
    } catch (e) {
      saveFailed(e);
      load(); // revert on failure
    }
  };

  const add = async () => {
    if (!newPage || !newSection || !newLabel) return;
    setSaving(true);
    try {
      await saveRecord("page-modules", undefined, {
        page: newPage, section: newSection, label: newLabel, visible: true,
      });
      setNewPage(""); setNewSection(""); setNewLabel("");
      load();
    } catch (e) {
      saveFailed(e);
    } finally {
      setSaving(false);
    }
  };

  const reorder = async (sourceId: string, targetId: string) => {
    if (sorting || modules.find((m) => m.id === sourceId)?.page !== modules.find((m) => m.id === targetId)?.page) return;
    const next = moveItem(modules, sourceId, targetId);
    if (next === modules) return;
    setModules(next);
    setSorting(true);
    try {
      await saveOrder("page-modules", next.map((m) => m.id));
    } catch (e) {
      setModules(modules);
      saveFailed(e);
    } finally {
      setSorting(false);
    }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  // Group rows by page so each page's toggles sit together.
  const byPage: Record<string, any[]> = modules.reduce((acc, m) => {
    (acc[m.page] ||= []).push(m);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      {(Object.entries(byPage) as [string, any[]][]).map(([page, rows]) => (
        <div key={page} className={cardCls}>
          <h2 className="text-lg font-semibold capitalize text-foreground">{page}</h2>
          <div className="mt-2 divide-y divide-border/40">
            {rows.map((m, index) => (
              <div key={m.id} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); if (draggedId.current) reorder(draggedId.current, m.id); draggedId.current = null; }} className="flex items-center gap-3 py-3">
                <button type="button" draggable={!sorting} onDragStart={(e) => { draggedId.current = m.id; e.dataTransfer.effectAllowed = "move"; }} onDragEnd={() => { draggedId.current = null; }} aria-label={`Drag ${m.label} to reorder`} className="cursor-grab select-none text-lg text-muted-foreground active:cursor-grabbing">⠿</button>
                <span className="text-sm text-foreground">{m.label}</span>
                <button type="button" onClick={() => reorder(m.id, rows[index - 1].id)} disabled={sorting || index === 0} aria-label={`Move ${m.label} up`} className={`${linkBtn} ml-auto disabled:opacity-30`}>↑</button>
                <button type="button" onClick={() => reorder(m.id, rows[index + 1].id)} disabled={sorting || index === rows.length - 1} aria-label={`Move ${m.label} down`} className={`${linkBtn} disabled:opacity-30`}>↓</button>
                <input
                  type="checkbox"
                  checked={m.visible}
                  onChange={(e) => toggle(m, e.target.checked)}
                  aria-label={`Show ${m.label}`}
                  className="h-4 w-4"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={cardCls}>
        <h2 className="text-lg font-semibold text-foreground">Add module</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <input placeholder="Page (e.g. home)" value={newPage} onChange={(e) => setNewPage(e.target.value)} className={inputCls} />
          <input placeholder="Section key" value={newSection} onChange={(e) => setNewSection(e.target.value)} className={inputCls} />
          <input placeholder="Label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} className={inputCls} />
          <button onClick={add} disabled={saving} className={primaryBtn}>
            {saving ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  const fields = [
    { key: "hero_badge", label: "Hero Badge" },
    { key: "hero_subtitle", label: "Hero Subtitle" },
    { key: "about_me", label: "About Me (paragraph 1)", as: "textarea" },
    { key: "about_focus", label: "About Me (paragraph 2)", as: "textarea" },
    { key: "cta_title", label: "CTA Title" },
    { key: "cta_subtitle", label: "CTA Subtitle" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Location" },
  ];

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Site Settings</h2>
        <button
          onClick={save}
          disabled={saving}
          className={primaryBtn}
        >
          {saved ? "Saved!" : saving ? "Saving..." : "Save All"}
        </button>
      </div>
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-sm font-medium text-foreground">{f.label}</label>
            {f.as === "textarea" ? (
              <textarea
                value={settings[f.key] || ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
                rows={3}
              />
            ) : (
              <input
                value={settings[f.key] || ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared Components ───────────────────────────────────────────

function Field({ label, value, onChange, as, type, required }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  as?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
          rows={3}
        />
      ) : (
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
        />
      )}
    </div>
  );
}

// Edits a string[] as a list of text lines with add/remove. Used for a post's
// paragraphs and an experience's highlights — the same UI in both places.
function LineEditor({ label, addLabel, values, setValues }: {
  label: string;
  addLabel: string;
  values: string[];
  setValues: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {values.map((line, i) => (
        <div key={i} className="mt-1 flex gap-2">
          <input
            value={line}
            onChange={(e) => {
              const n = [...values];
              n[i] = e.target.value;
              setValues(n);
            }}
            className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
            placeholder="..."
          />
          {values.length > 1 && (
            <button onClick={() => setValues(values.filter((_, j) => j !== i))} className="text-xs text-red-400">x</button>
          )}
        </div>
      ))}
      <button onClick={() => setValues([...values, ""])} className="mt-2 text-xs text-muted-foreground hover:text-foreground">
        {addLabel}
      </button>
    </div>
  );
}
