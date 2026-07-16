"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { projects as fallbackProjects } from "@/data/projects";
import { skill as fallbackSkills } from "@/data/skill";
import { careerTimeline as fallbackTimeline, cvQuickInfo as fallbackQuickInfo } from "@/data/cv";
import { Location, Sms, Call, ArrowRight, ExportSquare } from "iconsax-reactjs";
import { useModuleVisibility } from "@/app/utils/useModuleVisibility";

function RevealSection({ children, className, show = true }: { children: React.ReactNode; className?: string; show?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  if (!show) return null;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [skills, setSkills] = useState(fallbackSkills);
  const [timeline, setTimeline] = useState(fallbackTimeline);
  const [quickInfo] = useState(fallbackQuickInfo);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const modules = useModuleVisibility("home");

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/projects").then((r) => r.json()).then((d) => d.length && setProjects(d.map((p: any) => ({
        name: p.name, date: p.date, description: p.description || "", image: p.image,
        preview: p.preview, linkSource: p.link_source, tag: p.tags || [],
      })))),
      fetch("/api/skills").then((r) => r.json()).then((d) => d.length && setSkills(d.map((s: any) => ({
        name: s.name, link: s.link, image: s.image,
      })))),
      fetch("/api/experiences").then((r) => r.json()).then((d) => d.length && setTimeline(d.map((e: any) => ({
        company: e.company, role: e.role, period: e.period, location: e.location, highlights: e.highlights || [],
      })))),
      fetch("/api/settings").then((r) => r.json()).then((d) => Object.keys(d).length && setSettings(d)),
    ]);
  }, []);

  return (
    <div className="space-y-16 pb-20">
      <section className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <Badge variant="outline" className="w-fit rounded-full text-xs text-muted-foreground">
                {settings.hero_badge || "Building clean web experiences"}
              </Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Mai Tri Thanh
              </h1>
              <p className="mt-2 max-w-md text-base text-muted-foreground">
                {settings.hero_subtitle || "Fullstack Developer crafting modern, fast and delightful products."}
              </p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight variant="Outline" className="ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">About Me</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/CV_MaiTriThanh.pdf" target="_blank" rel="noreferrer">
                  Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Focus</p>
              <p className="mt-1 text-lg font-medium text-foreground">Web Developer</p>
              <p className="text-muted-foreground">React · Next.js · Laravel</p>
            </CardHeader>
            <CardContent className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Location variant="Outline" className="shrink-0 text-foreground/40" />
                <span>{settings.location || "Ho Chi Minh City"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Sms variant="Outline" className="shrink-0 text-foreground/40" />
                <a href={`mailto:${settings.email || "maitrithanh06@gmail.com"}`} className="transition-colors hover:text-foreground">
                  {settings.email || "maitrithanh06@gmail.com"}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Call variant="Outline" className="shrink-0 text-foreground/40" />
                <span>{settings.phone || "+84 325575029"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <RevealSection show={modules.isVisible("stats")}>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-foreground">2+</p>
            <p className="mt-1 text-sm text-muted-foreground">Years of experience</p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-foreground">{projects.length}+</p>
            <p className="mt-1 text-sm text-muted-foreground">Projects shipped</p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-foreground">{skills.length}+</p>
            <p className="mt-1 text-sm text-muted-foreground">Technologies used</p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-foreground">500+</p>
            <p className="mt-1 text-sm text-muted-foreground">Git contributions</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection show={modules.isVisible("tech_stack")}>
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider text-primary">
            Tech Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.slice(0, 12).map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                <Image src={item.image} alt={item.name} width={14} height={14} className="h-3.5 w-3.5" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection show={modules.isVisible("education")}>
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider text-primary">
            Education
          </h2>
          <div className="mt-4 border-l-2 border-primary pl-4">
            <p className="font-medium text-foreground">Software Engineering</p>
            <p className="text-sm text-muted-foreground">HUFLIT · 2020 – 2024</p>
            <p className="mt-1 text-sm text-muted-foreground/60 italic">{quickInfo.education}</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection show={modules.isVisible("core_skills")}>
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider text-primary">
            Core Skills
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickInfo.coreSkills.map((s) => (
              <span key={s} className="rounded-lg border bg-muted/30 px-3 py-1.5 text-sm text-foreground/70">
                {s}
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection show={modules.isVisible("experience")}>
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider text-primary">
            Experience
          </h2>
          <div className="mt-4 space-y-6">
            {timeline.map((item, idx) => (
              <div key={`${item.company}-${item.period}`} className="border-l-2 border-primary pl-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.role}</p>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.period}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground/60">{item.location}</p>
                <ul className="mt-2 space-y-1">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection show={modules.isVisible("projects")}>
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-md font-bold uppercase tracking-wider text-primary">
              Projects
            </h2>
            <Link href="/projects" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">
              See all →
            </Link>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <a href={project.preview} target="_blank" key={project.name}
                className="group block rounded-xl border bg-muted/20 transition-colors hover:border-foreground/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
                  <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{project.date}</p>
                  <p className="mt-0.5 font-medium text-foreground">{project.name}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                    Preview <ExportSquare variant="Outline" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection show={modules.isVisible("cta")}>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-medium text-foreground">
                {settings.cta_title || "Let's build something memorable."}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {settings.cta_subtitle || "Open for freelance, product, and startup collaborations."}
              </p>
            </div>
            <Button asChild>
              <Link href={`mailto:${settings.email || "maitrithanh06@gmail.com"}`}>
                Contact Me <ArrowRight variant="Outline" className="ml-1.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </RevealSection>
    </div>
  );
}
