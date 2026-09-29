import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/projects",
  title: "Projects",
  description: "Explore Mai Tri Thanh's web projects and product experiments, built with a focus on clean UX and practical engineering.",
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
