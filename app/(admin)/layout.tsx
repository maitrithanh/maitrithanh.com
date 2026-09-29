"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export type AdminTab = "projects" | "blog" | "skills" | "experience" | "modules" | "settings";
const AdminTabContext = createContext<{ tab: AdminTab; setTab: (tab: AdminTab) => void } | null>(null);

export function useAdminTab() {
  const context = useContext(AdminTabContext);
  if (!context) throw new Error("Admin tabs require AdminLayout");
  return context;
}

const tabs: { key: AdminTab; label: string }[] = [
  { key: "projects", label: "Projects" },
  { key: "blog", label: "Blog" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "modules", label: "Modules" },
  { key: "settings", label: "Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<AdminTab>("projects");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/qlmtt/login") {
      setLoading(false);
      return;
    }
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => router.push("/qlmtt/login"))
      .finally(() => setLoading(false));
  }, [pathname, router]);

  if (pathname === "/qlmtt/login") {
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
    router.push("/qlmtt/login");
    router.refresh();
  };

  return (
    <AdminTabContext.Provider value={{ tab, setTab }}>
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setTab("projects")} className="text-sm font-semibold text-foreground">CMS Panel</button>
          </div>
          <nav aria-label="CMS sections" className="order-last flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-current={t.key === tab ? "page" : undefined}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${t.key === tab ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t.label}
                </button>
              ))}
          </nav>
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
    </AdminTabContext.Provider>
  );
}
