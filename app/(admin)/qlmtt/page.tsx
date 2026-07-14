"use client";
import { useEffect, useState, useCallback } from "react";

type Tab = "projects" | "blog" | "skills" | "experience" | "settings";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("projects");

  const tabs: { key: Tab; label: string }[] = [
    { key: "projects", label: "Projects" },
    { key: "blog", label: "Blog" },
    { key: "skills", label: "Skills" },
    { key: "experience", label: "Experience" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <SeedButton />
      </div>

      <div className="flex gap-1 rounded-xl">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              tab === t.key
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "projects" && <ProjectsManager />}
      {tab === "blog" && <BlogManager />}
      {tab === "skills" && <SkillsManager />}
      {tab === "experience" && <ExperienceManager />}
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

// ─── Manager Components ───────────────────────────────────────────

function ProjectsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/projects");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (data: any) => {
    setSaving(true);
    if (editing?.id) {
      await fetch(`/api/projects/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setEditing(null);
    setSaving(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  if (editing !== null) {
    return (
      <FormCard
        title={editing.id ? "Edit Project" : "New Project"}
        onCancel={() => setEditing(null)}
        onSave={save}
        saving={saving}
        defaultValues={editing}
        fields={[
          { key: "name", label: "Name", required: true },
          { key: "date", label: "Date", required: true },
          { key: "description", label: "Description", as: "textarea" },
          { key: "image", label: "Image path", required: true },
          { key: "preview", label: "Preview URL", required: true },
          { key: "link_source", label: "Source URL", required: true },
        ]}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} projects</p>
        <button
          onClick={() => setEditing({})}
          className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
        >
          + Add Project
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(item)}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Edit
              </button>
              <button
                onClick={() => remove(item.id)}
                className="text-xs text-red-400 transition-colors hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [contentLines, setContentLines] = useState<string[]>([""]);

  const load = useCallback(async () => {
    const res = await fetch("/api/blog");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (data: any) => {
    setSaving(true);
    const body = { ...data, content: contentLines.filter(Boolean) };
    if (editing?.id) {
      await fetch(`/api/blog/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    setEditing(null);
    setSaving(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    load();
  };

  const startEdit = (item: any) => {
    setContentLines(item?.content || [""]);
    setEditing(item || {});
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  if (editing !== null) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          {editing.id ? "Edit Post" : "New Post"}
        </h2>
        <div className="mt-4 space-y-4">
          <Field label="Title" value={editing.title || ""} onChange={(v) => setEditing({ ...editing, title: v })} required />
          <Field label="Slug" value={editing.slug || ""} onChange={(v) => setEditing({ ...editing, slug: v })} required />
          <Field label="Category" value={editing.category || ""} onChange={(v) => setEditing({ ...editing, category: v })} required />
          <Field label="Summary" value={editing.summary || ""} onChange={(v) => setEditing({ ...editing, summary: v })} as="textarea" required />
          <Field label="Published At" value={editing.published_at || ""} onChange={(v) => setEditing({ ...editing, published_at: v })} required />
          <Field label="Read Time" value={editing.read_time || ""} onChange={(v) => setEditing({ ...editing, read_time: v })} required />
          <Field label="Cover image" value={editing.cover || ""} onChange={(v) => setEditing({ ...editing, cover: v })} required />
          <div>
            <label className="text-sm font-medium text-foreground">Content (paragraphs)</label>
            {contentLines.map((line, i) => (
              <div key={i} className="mt-1 flex gap-2">
                <input
                  value={line}
                  onChange={(e) => {
                    const next = [...contentLines];
                    next[i] = e.target.value;
                    setContentLines(next);
                  }}
                  className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
                  placeholder="Paragraph text..."
                />
                {contentLines.length > 1 && (
                  <button onClick={() => setContentLines(contentLines.filter((_, j) => j !== i))} className="text-xs text-red-400">x</button>
                )}
              </div>
            ))}
            <button
              onClick={() => setContentLines([...contentLines, ""])}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground"
            >
              + Add paragraph
            </button>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setEditing(null)}
            className="rounded-lg border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={() => save(editing)}
            disabled={saving}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} posts</p>
        <button
          onClick={() => startEdit(null)}
          className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
        >
          + Add Post
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item: any) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.category} · {item.published_at}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="text-xs text-muted-foreground transition-colors hover:text-foreground">Edit</button>
              <button onClick={() => remove(item.id)} className="text-xs text-red-400 transition-colors hover:text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/skills");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (data: any) => {
    setSaving(true);
    if (editing?.id) {
      await fetch(`/api/skills/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    } else {
      await fetch("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    }
    setEditing(null);
    setSaving(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    load();
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  if (editing !== null) {
    return (
      <FormCard title={editing.id ? "Edit Skill" : "New Skill"} onCancel={() => setEditing(null)} onSave={save} saving={saving} defaultValues={editing}
        fields={[
          { key: "name", label: "Name", required: true },
          { key: "link", label: "Link (URL)", required: true },
          { key: "image", label: "Image URL", required: true },
        ]}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} skills</p>
        <button onClick={() => setEditing({})} className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90">+ Add Skill</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item: any) => (
          <div key={item.id} className="group flex items-center gap-2 rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
            <img src={item.image} alt={item.name} className="h-4 w-4" />
            <span className="text-sm text-foreground">{item.name}</span>
            <div className="ml-1 hidden gap-1 group-hover:flex">
              <button onClick={() => setEditing(item)} className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
              <button onClick={() => remove(item.id)} className="text-xs text-red-400 hover:text-red-500">Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([""]);

  const load = useCallback(async () => {
    const res = await fetch("/api/experiences");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (data: any) => {
    setSaving(true);
    const body = { ...data, highlights: highlights.filter(Boolean) };
    if (editing?.id) {
      await fetch(`/api/experiences/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch("/api/experiences", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    setEditing(null);
    setSaving(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    load();
  };

  const startEdit = (item: any) => {
    setHighlights(item?.highlights || [""]);
    setEditing(item || {});
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  if (editing !== null) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">{editing.id ? "Edit Experience" : "New Experience"}</h2>
        <div className="mt-4 space-y-4">
          <Field label="Company" value={editing.company || ""} onChange={(v) => setEditing({ ...editing, company: v })} required />
          <Field label="Role" value={editing.role || ""} onChange={(v) => setEditing({ ...editing, role: v })} required />
          <Field label="Period" value={editing.period || ""} onChange={(v) => setEditing({ ...editing, period: v })} required />
          <Field label="Location" value={editing.location || ""} onChange={(v) => setEditing({ ...editing, location: v })} required />
          <Field label="Sort Order" value={String(editing.sort_order || 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) })} />
          <div>
            <label className="text-sm font-medium text-foreground">Highlights</label>
            {highlights.map((line, i) => (
              <div key={i} className="mt-1 flex gap-2">
                <input value={line} onChange={(e) => { const n = [...highlights]; n[i] = e.target.value; setHighlights(n); }}
                  className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground" placeholder="Highlight..." />
                {highlights.length > 1 && <button onClick={() => setHighlights(highlights.filter((_, j) => j !== i))} className="text-xs text-red-400">x</button>}
              </div>
            ))}
            <button onClick={() => setHighlights([...highlights, ""])} className="mt-2 text-xs text-muted-foreground hover:text-foreground">+ Add highlight</button>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setEditing(null)} className="rounded-lg border border-border/60 px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          <button onClick={() => save(editing)} disabled={saving} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} experiences</p>
        <button onClick={() => startEdit(null)} className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background">+ Add Experience</button>
      </div>
      <div className="space-y-2">
        {items.map((item: any) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">{item.role} <span className="text-muted-foreground">@ {item.company}</span></p>
              <p className="text-xs text-muted-foreground">{item.period}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
              <button onClick={() => remove(item.id)} className="text-xs text-red-400 hover:text-red-500">Delete</button>
            </div>
          </div>
        ))}
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
          className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
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

function Field({ label, value, onChange, as, required }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  as?: string;
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
        />
      )}
    </div>
  );
}

function FormCard({ title, onCancel, onSave, saving, defaultValues, fields }: {
  title: string;
  onCancel: () => void;
  onSave: (data: any) => void;
  saving: boolean;
  defaultValues: any;
  fields: { key: string; label: string; required?: boolean; as?: string }[];
}) {
  const [data, setData] = useState<any>(defaultValues || {});

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4">
        {fields.map((f) => (
          <Field
            key={f.key}
            label={f.label}
            value={data[f.key] || ""}
            onChange={(v) => setData({ ...data, [f.key]: v })}
            as={f.as}
            required={f.required}
          />
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(data)}
          disabled={saving}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
