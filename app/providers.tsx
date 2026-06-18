import { Analytics } from "@vercel/analytics/next"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics/>
      {children}
    </>
  );
}
