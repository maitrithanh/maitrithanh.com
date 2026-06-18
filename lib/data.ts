import { createClient } from "./supabase/server";
import { projects as staticProjects } from "@/data/projects";
import { blogPosts as staticBlogPosts } from "@/lib/blog";
import { skill as staticSkills } from "@/data/skill";
import { careerTimeline as staticTimeline, cvQuickInfo as staticQuickInfo } from "@/data/cv";

export async function getProjects() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) {
      return data.map((p: any) => ({
        name: p.name,
        date: p.date,
        description: p.description || "",
        image: p.image,
        preview: p.preview,
        linkSource: p.link_source,
        tag: p.tags || [],
      }));
    }
  } catch {}
  return staticProjects;
}

export async function getBlogPosts() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
    if (data && data.length > 0) {
      return data.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        summary: p.summary,
        publishedAt: p.published_at,
        readTime: p.read_time,
        cover: p.cover,
        content: p.content || [],
      }));
    }
  } catch {}
  return staticBlogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
    if (data) {
      return {
        slug: data.slug,
        title: data.title,
        category: data.category,
        summary: data.summary,
        publishedAt: data.published_at,
        readTime: data.read_time,
        cover: data.cover,
        content: data.content || [],
      };
    }
  } catch {}
  const posts = staticBlogPosts;
  return posts.find((p) => p.slug === slug) || null;
}

export async function getSkills() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("skills").select("*").order("created_at");
    if (data && data.length > 0) {
      return data.map((s: any) => ({
        name: s.name,
        link: s.link,
        image: s.image,
      }));
    }
  } catch {}
  return staticSkills;
}

export async function getExperiences() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("experiences").select("*").order("sort_order");
    if (data && data.length > 0) {
      return data.map((e: any) => ({
        company: e.company,
        role: e.role,
        period: e.period,
        location: e.location,
        highlights: e.highlights || [],
      }));
    }
  } catch {}
  return staticTimeline;
}

export async function getSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*");
    if (data && data.length > 0) {
      const settings: Record<string, string> = {};
      for (const item of data) {
        settings[item.key] = item.value;
      }
      return settings;
    }
  } catch {}
  return {};
}
