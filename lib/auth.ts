import { NextResponse } from "next/server";
import { createClient } from "./supabase/server";

export const ALLOWED_EMAIL =
  process.env.ADMIN_EMAIL || "maitrithanh06@gmail.com";

export async function getAdminUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== ALLOWED_EMAIL) return null;
  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}
