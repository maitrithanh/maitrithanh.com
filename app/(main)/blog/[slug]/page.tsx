import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts as fallbackPosts } from "@/lib/blog";
import { getBlogPostBySlug } from "@/lib/data";
import { ArrowLeft, Calendar, Clock } from "iconsax-reactjs";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} | Blog`,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: `${SITE_URL}${post.cover}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog`,
      description: post.summary,
      images: [`${SITE_URL}${post.cover}`],
    },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.summary,
            image: `${SITE_URL}${post.cover}`,
            datePublished: post.publishedAt,
            author: { "@type": "Person", name: "Mai Tri Thanh", url: SITE_URL },
            publisher: { "@type": "Person", name: "Mai Tri Thanh" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
          }),
        }}
      />
      <div className="mx-auto max-w-3xl space-y-6">
        <Button asChild variant="outline">
          <Link href="/blog" className="inline-flex items-center gap-2">
            <ArrowLeft variant="Outline" size={12} /> Back to blog
          </Link>
        </Button>

        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="relative h-56 w-full md:h-72">
            <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
          </div>
          <div className="space-y-5 p-6 md:p-8">
            <Badge variant="outline" className="border-border/60 bg-muted/30 text-xs text-foreground/70">
              {post.category}
            </Badge>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">{post.title}</h1>
            <p className="text-base text-muted-foreground">{post.summary}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar variant="Outline" />{new Date(post.publishedAt).toLocaleDateString("en-GB")}</span>
              <span className="inline-flex items-center gap-1.5"><Clock variant="Outline" />{post.readTime}</span>
            </div>
            <article className="space-y-4 text-base leading-7 text-foreground/85">
              {post.content.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
