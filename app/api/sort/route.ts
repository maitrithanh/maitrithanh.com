import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const resources = {
  projects: "projects",
  blog: "blog_posts",
  skills: "skills",
  experiences: "experiences",
  "page-modules": "page_modules",
} as const;

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const resource = body?.resource as keyof typeof resources;
  const ids = body?.ids;
  if (!Object.hasOwn(resources, resource) || !Array.isArray(ids) || ids.length > 1000 ||
      !ids.every((id) => typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id)) ||
      new Set(ids).size !== ids.length) {
    return NextResponse.json({ error: "Invalid sort order" }, { status: 400 });
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from("site_settings").upsert({
    key: `sort:${resources[resource]}`,
    value: JSON.stringify(ids),
  }, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
