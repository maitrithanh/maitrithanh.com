import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiEmotionSadLine, RiHomeLine, RiFolderOpenLine } from "react-icons/ri";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-12">
      <Card className="neo-glass">
        <CardHeader className="items-center text-center">
          <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white dark:border-white/15 dark:bg-zinc-900">
            <RiEmotionSadLine className="text-2xl text-foreground" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight">404</CardTitle>
          <p className="text-sm text-muted-foreground">Page not found</p>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            The page you are looking for does not exist or has been moved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button asChild className="rounded-full">
              <Link href="/" className="inline-flex items-center gap-2">
                <RiHomeLine />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/projects" className="inline-flex items-center gap-2">
                <RiFolderOpenLine />
                View Projects
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
