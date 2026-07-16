"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");

  const signIn = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Admin Login
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in with Google to manage your site content.
        </p>
        {error && (
          <p className="mt-4 text-sm text-red-500">
            {error === "unauthorized"
              ? "This account is not allowed to access the CMS."
              : "Sign in failed. Please try again."}
          </p>
        )}
        <button
          onClick={signIn}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 disabled:opacity-50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.google.com/favicon.ico" alt="" className="h-4 w-4" />
          {loading ? "Redirecting..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}
