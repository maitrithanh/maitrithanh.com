"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const tabs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Projects", href: "/admin" },
    { label: "Blog", href: "/admin" },
    { label: "Skills", href: "/admin" },
    { label: "Experience", href: "/admin" },
    { label: "Settings", href: "/admin" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-semibold text-foreground"
            >
              CMS Panel
            </Link>
            <div className="hidden items-center gap-1 sm:flex">
              {tabs.map((tab) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
