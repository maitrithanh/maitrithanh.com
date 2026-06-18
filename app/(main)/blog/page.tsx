"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { blogPosts as fallbackPosts } from "@/lib/blog";
import { FaRegCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { RiSparklingLine, RiArrowRightUpLine } from "react-icons/ri";

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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <RiSparklingLine className="mr-1.5" />
                Articles
              </Badge>
              <CardTitle className="mt-2 text-3xl">Blog</CardTitle>
              <CardDescription>
                Insights on product engineering, motion design, and scalable frontend development.
              </CardDescription>
            </div>
            <Button asChild className="rounded-full shrink-0">
              <Link href="mailto:maitrithanh06@gmail.com">
                Suggest a topic <RiArrowRightUpLine className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <div className="relative h-40 w-full overflow-hidden">
                <Image src={post.cover} alt={post.title} fill className="object-cover transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              <CardContent className="space-y-3 p-5">
                <Badge className="rounded-md border-primary/15 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
                  {post.category}
                </Badge>
                <CardTitle className="line-clamp-2 text-lg leading-snug">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.summary}</CardDescription>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><FaRegCalendarAlt className="text-primary/60" />{new Date(post.publishedAt).toLocaleDateString("en-GB")}</span>
                  <span className="inline-flex items-center gap-1.5"><FaClock className="text-primary/60" />{post.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                  Read detail <FaArrowRight className="text-xs" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
