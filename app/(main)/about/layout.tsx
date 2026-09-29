import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/about",
  title: "About",
  description: "Meet Mai Tri Thanh, a full-stack developer in Ho Chi Minh City building fast, thoughtful web products with Next.js, React, and Laravel.",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
