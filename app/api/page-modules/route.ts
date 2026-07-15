export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { list, create } from "@/lib/supabase/api";

export async function GET(request: Request) {
  const page = new URL(request.url).searchParams.get("page");
  const data = await list("page_modules", { orderBy: "sort_order" });
  return NextResponse.json(page ? data.filter((m: any) => m.page === page) : data);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json();
  try {
    const data = await create("page_modules", body);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Create failed" }, { status: 400 });
  }
}
