export function moveItem<T extends { id: string }>(items: T[], sourceId: string, targetId: string): T[] {
  const from = items.findIndex((item) => item.id === sourceId);
  const to = items.findIndex((item) => item.id === targetId);
  if (from < 0 || to < 0 || from === to) return items;
  const next = [...items];
  next.splice(to, 0, ...next.splice(from, 1));
  return next;
}

export function applySavedOrder<T extends { id: string }>(items: T[], ids: string[]): T[] {
  const positions = new Map(ids.map((id, index) => [id, index]));
  return [...items].sort((a, b) => (positions.get(a.id) ?? ids.length) - (positions.get(b.id) ?? ids.length));
}
