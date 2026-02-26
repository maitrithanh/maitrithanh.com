import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog";
import type { BlogPost } from "@/types/blog";
import { FaArrowLeft, FaRegCalendarAlt, FaClock } from "react-icons/fa";

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

const findPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((item) => item.slug === slug);
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogDetailProps): Metadata {
  const post = findPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.summary,
  };
}

export default function BlogDetailPage({ params }: BlogDetailProps) {
  const post = findPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button asChild variant="outline" className="rounded-full border-black/20 bg-white hover:bg-black hover:text-white dark:border-white/20 dark:bg-zinc-900 dark:hover:bg-white dark:hover:text-black">
        <Link href="/blog" className="inline-flex items-center gap-2">
          <FaArrowLeft className="text-xs" />
          Back to blog
        </Link>
      </Button>

      <Card className="neo-glass overflow-hidden">
        <div className="relative h-56 w-full border-b border-black/10 dark:border-white/10 md:h-72">
          <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
        </div>

        <CardContent className="space-y-5 p-6 md:p-8">
          <Badge variant="outline" className="border-black/20 bg-white text-black dark:border-white/20 dark:bg-zinc-900 dark:text-white">
            {post.category}
          </Badge>

          <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">{post.title}</h1>
          <p className="text-base text-muted-foreground">{post.summary}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <FaRegCalendarAlt />
              {new Date(post.publishedAt).toLocaleDateString("en-GB")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaClock />
              {post.readTime}
            </span>
          </div>

          <article className="space-y-4 text-base leading-7 text-foreground/85">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
