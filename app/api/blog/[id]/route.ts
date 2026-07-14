export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getById, update, remove } from "@/lib/supabase/api";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const data = await getById("blog_posts", params.id);
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json();
  try {
    const data = await update("blog_posts", params.id, body);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  await remove("blog_posts", params.id);
  return NextResponse.json({ ok: true });
}
