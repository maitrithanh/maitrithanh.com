export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { projects } from "@/data/projects";
import { skill } from "@/data/skill";
import { careerTimeline } from "@/data/cv";
import { blogPosts } from "@/lib/blog";

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const supabase = await createAdminClient();
  const result: Record<string, number> = {};

  const { count: pc } = await supabase.from("projects").select("*", { count: "exact", head: true });
  if (!pc) {
    const rows = projects.map((p) => ({
      name: p.name,
      date: p.date,
      description: p.description || "",
      image: p.image,
      preview: p.preview,
      link_source: p.linkSource,
      tags: p.tag || [],
    }));
    const { error } = await supabase.from("projects").insert(rows);
    if (error) throw error;
    result.projects = rows.length;
  }

  const { count: bc } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
  if (!bc) {
    const rows = blogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      summary: p.summary,
      published_at: p.publishedAt,
      read_time: p.readTime,
      cover: p.cover,
      content: p.content || [],
    }));
    const { error } = await supabase.from("blog_posts").insert(rows);
    if (error) throw error;
    result.blog_posts = rows.length;
  }

  const { count: sc } = await supabase.from("skills").select("*", { count: "exact", head: true });
  if (!sc) {
    const rows = skill.map((s) => ({ name: s.name, link: s.link, image: s.image }));
    const { error } = await supabase.from("skills").insert(rows);
    if (error) throw error;
    result.skills = rows.length;
  }

  const { count: ec } = await supabase.from("experiences").select("*", { count: "exact", head: true });
  if (!ec) {
    const rows = careerTimeline.map((e, i) => ({
      company: e.company,
      role: e.role,
      period: e.period,
      location: e.location,
      highlights: e.highlights || [],
      sort_order: i,
    }));
    const { error } = await supabase.from("experiences").insert(rows);
    if (error) throw error;
    result.experiences = rows.length;
  }

  return NextResponse.json({ ok: true, seeded: result });
}
