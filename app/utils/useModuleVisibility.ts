"use client";
import { useEffect, useState } from "react";

// Reads the toggle rows for one page and exposes isVisible(section).
// ponytail: a missing row means "visible", so pages still render before
// the table is seeded.
export function useModuleVisibility(page: string) {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [positions, setPositions] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(`/api/page-modules?page=${page}`)
      .then((r) => r.json())
      .then((rows: any[]) => {
        const map: Record<string, boolean> = {};
        const order: Record<string, number> = {};
        rows.forEach((m, index) => { map[m.section] = m.visible; order[m.section] = index + 1; });
        setFlags(map);
        setPositions(order);
      })
      .catch(() => {});
  }, [page]);

  const isVisible = (section: string) => (section in flags ? flags[section] : true);
  const order = (section: string, fallback: number) => positions[section] ?? fallback;
  return { isVisible, order };
}
