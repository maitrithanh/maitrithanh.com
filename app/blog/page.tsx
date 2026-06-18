import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog";
import { FaRegCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on product engineering, motion design, and scalable frontend development by Mai Tri Thanh.",
  openGraph: {
    title: "Blog | Mai Tri Thanh",
    description:
      "Insights on product engineering, motion design, and scalable frontend development.",
    url: `${SITE_URL}/blog`,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mai Tri Thanh Blog",
      },
    ],
  },
  twitter: {
    title: "Blog | Mai Tri Thanh",
    description:
      "Insights on product engineering, motion design, and scalable frontend development.",
    images: [SITE_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const BlogPage = () => {
  return (
    <div className="space-y-6">
      <Card className="neo-glass">
        <CardHeader>
          <CardTitle className="text-3xl">Blog</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Insights on product engineering, motion design, and scalable frontend development.</p>
          <Button asChild className="rounded-full">
            <Link href="mailto:maitrithanh06@gmail.com">Suggest a topic</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="neo-glass overflow-hidden transition-all hover:-translate-y-1 hover:shadow-sm">
              <div className="relative h-40 w-full overflow-hidden border-b border-black/10 dark:border-white/10">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <CardContent className="space-y-3 p-5">
                <Badge variant="outline" className="border-black/20 bg-white text-black dark:border-white/20 dark:bg-zinc-900 dark:text-white">
                {post.category}
                </Badge>

                <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.summary}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <FaRegCalendarAlt />
                    {new Date(post.publishedAt).toLocaleDateString("en-GB")}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaClock />
                    {post.readTime}
                  </span>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
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
