export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { addPageModule, getPageModules } from "@/lib/page-modules";

export async function GET(request: Request) {
  const page = new URL(request.url).searchParams.get("page");
  const data = await getPageModules();
  return NextResponse.json(page ? data.filter((m: any) => m.page === page) : data);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json();
  try {
    if (!/^[a-z0-9_-]{1,50}$/i.test(body.page) || !/^[a-z0-9_-]{1,50}$/i.test(body.section) ||
        typeof body.label !== "string" || !body.label.trim() || body.label.length > 100) {
      return NextResponse.json({ error: "Invalid module" }, { status: 400 });
    }
    const data = await addPageModule(body.page, body.section, body.label.trim());
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Create failed" }, { status: 400 });
  }
}
