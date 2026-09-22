export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getById, update, remove } from "@/lib/supabase/api";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const data = await getById("blog_posts", (await params).id);
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json();
  try {
    const data = await update("blog_posts", (await params).id, body);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  await remove("blog_posts", (await params).id);
  return NextResponse.json({ ok: true });
}
