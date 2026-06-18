export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { list, create } from "@/lib/supabase/api";

export async function GET() {
  const data = await list("experiences", { orderBy: "sort_order" });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await create("experiences", body);
  return NextResponse.json(data);
}
