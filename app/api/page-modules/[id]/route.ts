export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deletePageModule, updatePageModule } from "@/lib/page-modules";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json();
  try {
    if (typeof body.visible !== "boolean") {
      return NextResponse.json({ error: "Invalid visibility" }, { status: 400 });
    }
    const data = await updatePageModule((await params).id, body.visible);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await deletePageModule((await params).id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Delete failed" }, { status: 400 });
  }
}
