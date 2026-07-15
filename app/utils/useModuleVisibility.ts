"use client";
import { useEffect, useState } from "react";

// Reads the toggle rows for one page and exposes isVisible(section).
// ponytail: a missing row means "visible", so pages still render before
// the table is seeded.
export function useModuleVisibility(page: string) {
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/page-modules?page=${page}`)
      .then((r) => r.json())
      .then((rows: any[]) => {
        const map: Record<string, boolean> = {};
        rows.forEach((m) => { map[m.section] = m.visible; });
        setFlags(map);
      })
      .catch(() => {});
  }, [page]);

  const isVisible = (section: string) => (section in flags ? flags[section] : true);
  return { isVisible };
}
