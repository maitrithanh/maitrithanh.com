import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

function getServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export async function createClient() {
  const url = getUrl();
  const key = getAnonKey();
  if (!url || !key) throw new Error("Supabase env vars not configured");

  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options),
        );
      },
    },
  });
}

export async function createAdminClient() {
  const url = getUrl();
  const key = getServiceKey();
  if (!url || !key) throw new Error("Supabase env vars not configured");

  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options),
        );
      },
    },
  });
}
