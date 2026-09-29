import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/blog",
  title: "Blog",
  description: "Articles by Mai Tri Thanh on product engineering, frontend development, and thoughtful web experiences.",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
