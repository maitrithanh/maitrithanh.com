export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { list, create } from "@/lib/supabase/api";

export async function GET() {
  const data = await list("blog_posts", { orderBy: "published_at" });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json();
  try {
    const data = await create("blog_posts", body);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Create failed" }, { status: 400 });
  }
}
