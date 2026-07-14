export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ALLOWED_EMAIL } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) return NextResponse.redirect(`${origin}/qlmtt/login?error=failed`);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${origin}/qlmtt/login?error=failed`);

  if (data.user?.email !== ALLOWED_EMAIL) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/qlmtt/login?error=unauthorized`);
  }

  return NextResponse.redirect(`${origin}/qlmtt`);
}
