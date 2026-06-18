"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { blogPosts as fallbackPosts } from "@/lib/blog";
import { FaRegCalendarAlt, FaArrowRight } from "react-icons/fa";

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
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge variant="outline" className="w-fit rounded-full text-xs text-muted-foreground">Articles</Badge>
              <CardTitle className="mt-1 text-3xl">Blog</CardTitle>
              <CardDescription>
                Insights on product engineering, motion design, and scalable frontend development.
              </CardDescription>
            </div>
            <Link href="mailto:maitrithanh06@gmail.com" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">
              Suggest a topic →
            </Link>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group rounded-xl border bg-muted/20 transition-colors hover:border-foreground/20">
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                <Image src={post.cover} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="p-4">
                <span className="rounded-md border bg-muted/30 px-2 py-0.5 text-xs text-foreground/60">{post.category}</span>
                <h3 className="mt-2 line-clamp-2 font-medium text-foreground">{post.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground/60">
                  <FaRegCalendarAlt className="mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString("en-GB")}
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground">
                  Read <FaArrowRight className="text-xs" />
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
