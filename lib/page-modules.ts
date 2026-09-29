import { applySavedOrder } from "@/lib/sort";
import { createAdminClient, createClient } from "@/lib/supabase/server";

type Module = {
  id: string;
  page: string;
  section: string;
  label: string;
  visible: boolean;
  sort_order: number;
};

const defaults = [
  ["home", "stats", "Stats"],
  ["home", "tech_stack", "Tech Stack"],
  ["home", "education", "Education"],
  ["home", "core_skills", "Core Skills"],
  ["home", "experience", "Experience"],
  ["home", "projects", "Projects"],
  ["home", "cta", "Call To Action"],
  ["about", "bio", "Bio"],
  ["about", "experience", "Experience"],
  ["about", "education", "Education"],
  ["projects", "content", "Projects List"],
  ["blog", "content", "Blog List"],
].map(([page, section, label], index) => ({
  id: `${page}:${section}`,
  page,
  section,
  label,
  visible: true,
  sort_order: index + 1,
}));

type Client = Awaited<ReturnType<typeof createClient>>;

async function readWith(client: Client): Promise<Module[]> {
  const { data: saved, error: savedError } = await client.from("site_settings")
    .select("value").eq("key", "page_modules").maybeSingle();
  if (savedError) throw savedError;

  let modules: Module[];
  if (saved) {
    modules = JSON.parse(saved.value);
    if (!Array.isArray(modules)) throw new Error("Invalid saved modules");
  } else {
    const { data, error } = await client.from("page_modules")
      .select("*").order("sort_order", { ascending: true });
    if (error && error.code !== "PGRST205") throw error;
    modules = error ? defaults : data;
  }

  const { data: order, error: orderError } = await client.from("site_settings")
    .select("value").eq("key", "sort:page_modules").maybeSingle();
  if (orderError) throw orderError;
  if (order) {
    try {
      const ids = JSON.parse(order.value);
      if (Array.isArray(ids)) return applySavedOrder(modules, ids);
    } catch { /* Keep the stored module order. */ }
  }
  return modules;
}

async function writeWith(client: Client, modules: Module[]) {
  // ponytail: one JSON row suits one editor; use a dedicated table for concurrent editors.
  const { error } = await client.from("site_settings").upsert({
    key: "page_modules",
    value: JSON.stringify(modules),
  }, { onConflict: "key" });
  if (error) throw error;
}

export async function getPageModules() {
  return readWith(await createClient());
}

export async function addPageModule(page: string, section: string, label: string) {
  const client = await createAdminClient();
  const modules = await readWith(client);
  if (modules.some((m) => m.page === page && m.section === section)) throw new Error("Module already exists");
  const row = { id: `${page}:${section}`, page, section, label, visible: true, sort_order: modules.length + 1 };
  await writeWith(client, [...modules, row]);
  return row;
}

export async function updatePageModule(id: string, visible: boolean) {
  const client = await createAdminClient();
  const modules = await readWith(client);
  const row = modules.find((m) => m.id === id);
  if (!row) throw new Error("Module not found");
  const updated = { ...row, visible };
  await writeWith(client, modules.map((m) => m.id === id ? updated : m));
  return updated;
}

export async function deletePageModule(id: string) {
  const client = await createAdminClient();
  const modules = await readWith(client);
  await writeWith(client, modules.filter((m) => m.id !== id));
}
