import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, FolderOpen } from "iconsax-reactjs";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-muted/30">
        <span className="text-2xl font-semibold text-muted-foreground">
          404
        </span>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/" className="inline-flex items-center gap-2">
            <Home variant="Outline" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects" className="inline-flex items-center gap-2">
            <FolderOpen variant="Outline" />
            View Projects
          </Link>
        </Button>
      </div>
    </div>
  );
}
