"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts as fallbackPosts } from "@/lib/blog";
import { FaRegCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";

const BlogPage = () => {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPosts(data.map((p: any) => ({
            slug: p.slug, title: p.title, category: p.category, summary: p.summary,
            publishedAt: p.published_at, readTime: p.read_time, cover: p.cover, content: p.content || [],
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Articles</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Blog</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Insights on product engineering, motion design, and scalable frontend development.
            </p>
          </div>
          <Button asChild className="rounded-full shrink-0">
            <Link href="mailto:maitrithanh06@gmail.com">Suggest a topic</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
              <div className="relative h-40 w-full overflow-hidden">
                <Image src={post.cover} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-3 p-5">
                <Badge variant="outline" className="border-border/60 bg-muted/30 text-xs text-foreground/70">{post.category}</Badge>
                <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground">{post.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><FaRegCalendarAlt />{new Date(post.publishedAt).toLocaleDateString("en-GB")}</span>
                  <span className="inline-flex items-center gap-1.5"><FaClock />{post.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                  Read detail <FaArrowRight className="text-xs" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
