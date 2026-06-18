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
import {
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
  RiSparklingLine,
  RiArrowRightUpLine,
  RiCodeBoxLine,
  RiPagesLine,
  RiUserHeartLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiCodeSSlashLine,
} from "react-icons/ri";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const HERO_NAME = "Mai Tri Thanh";

function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
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

  const stats = [
    { value: "2+", label: "Years Experience", icon: RiUserHeartLine },
    { value: `${projects.length}+`, label: "Projects Done", icon: RiPagesLine },
    { value: `${skills.length}+`, label: "Technologies", icon: RiCodeBoxLine },
    { value: "500+", label: "Git Commits", icon: RiSparklingLine },
  ];

  return (
    <div className="space-y-12 pb-20 md:space-y-16">
      <section className="grid gap-5 md:grid-cols-5">
        <FadeIn delay={0.1} className="md:col-span-3">
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute -inset-px rounded-xl ring-1 ring-inset ring-black/[0.02]" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
            <CardHeader>
              <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <RiSparklingLine className="mr-1.5" />
                {settings.hero_badge || "Building clean web experiences"}
              </Badge>
              <CardTitle className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {HERO_NAME}
              </CardTitle>
              <CardDescription className="mt-2 max-w-lg text-base md:text-lg">
                {settings.hero_subtitle || "Fullstack Developer crafting modern, fast and delightful products."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6 shadow-sm">
                <Link href="/projects">
                  View Projects
                  <RiArrowRightUpLine className="ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-full px-6">
                <Link href="/about">About Me</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/CV_MaiTriThanh.pdf" target="_blank" rel="noreferrer">
                  Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Focus</p>
              <CardTitle className="mt-1 text-2xl">Web Developer</CardTitle>
              <div className="mt-1 flex flex-wrap gap-x-2 text-lg text-muted-foreground">
                <span className="font-medium text-foreground/80">React</span>
                <span className="text-border">•</span>
                <span className="font-medium text-foreground/80">Next.js</span>
                <span className="text-border">•</span>
                <span className="font-medium text-foreground/80">Laravel</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5">
                <RiMapPinLine className="shrink-0 text-primary" />
                <span className="text-muted-foreground">{settings.location || "Ho Chi Minh City"}</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5">
                <RiMailLine className="shrink-0 text-primary" />
                <a href={`mailto:${settings.email || "maitrithanh06@gmail.com"}`} className="text-muted-foreground transition-colors hover:text-foreground">
                  {settings.email || "maitrithanh06@gmail.com"}
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5">
                <RiPhoneLine className="shrink-0 text-primary" />
                <span className="text-muted-foreground">{settings.phone || "+84 325575029"}</span>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      <RevealSection>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="group">
              <CardContent className="flex flex-col items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <stat.icon className="text-xl" />
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </RevealSection>

      <RevealSection>
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>Technologies I work with regularly.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {skills.slice(0, 12).map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-2.5 rounded-xl border border-border/60 bg-muted/20 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.03] hover:shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background p-2.5 shadow-sm ring-1 ring-border/40">
                    <Image src={item.image} alt={item.name} width={24} height={24} className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-foreground/70 group-hover:text-foreground">{item.name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </RevealSection>

      <RevealSection>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <RiBriefcaseLine className="text-sm text-primary" />
              </div>
              <CardTitle>Work Journey</CardTitle>
            </div>
            <CardDescription>Experience and profile highlights from my CV.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-8">
              <div className="absolute left-[17px] top-2 h-[calc(100%-16px)] w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent" />
              {timeline.map((item, idx) => (
                <div key={`${item.company}-${item.period}`} className="relative pl-12">
                  <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary/20 bg-background text-sm font-bold text-primary shadow-sm">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-5 transition-all hover:border-primary/20 hover:shadow-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {item.role}
                        </h3>
                        <p className="text-sm font-medium text-primary">{item.company}</p>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{item.period}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground/70">{item.location}</p>
                    <ul className="mt-3 space-y-2 border-t border-border/40 pt-3">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </RevealSection>

      <RevealSection>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <RiGraduationCapLine className="text-sm text-primary" />
              </div>
              <CardTitle>Education</CardTitle>
            </div>
            <CardDescription>Academic background and qualifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="bg-muted/20">
              <CardContent className="flex items-start gap-3 p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <RiGraduationCapLine className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{quickInfo.education}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Graduated 2024</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </RevealSection>

      <RevealSection>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <RiCodeSSlashLine className="text-sm text-primary" />
              </div>
              <CardTitle>Core Skills</CardTitle>
            </div>
            <CardDescription>Technologies and tools I use daily.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quickInfo.coreSkills.map((s) => (
                <Badge key={s} className="rounded-md border-primary/15 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </RevealSection>

      <RevealSection>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Featured Projects</CardTitle>
                <CardDescription>A selection of recent work.</CardDescription>
              </div>
              <Button asChild variant="ghost" className="rounded-full text-sm">
                <Link href="/projects">See all <RiArrowRightUpLine className="ml-1" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <Link href={project.preview} target="_blank" key={project.name}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-muted/20 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image src={project.image} alt={project.name} fill className="object-cover transition-all duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">{project.date}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Preview <FaArrowUpRightFromSquare className="text-[10px]" />
                      </span>
                    </div>
                    <h3 className="mt-1 line-clamp-2 font-semibold text-foreground">{project.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </RevealSection>

      <RevealSection>
        <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.04] to-primary/[0.08]">
          <CardContent className="flex flex-col items-center gap-6 p-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <CardTitle className="text-xl">
                {settings.cta_title || "Let's build something memorable."}
              </CardTitle>
              <CardDescription className="mt-1 max-w-lg">
                {settings.cta_subtitle || "Open for freelance, product, and startup collaborations."}
              </CardDescription>
            </div>
            <Button asChild className="rounded-full px-6 shadow-sm shrink-0">
              <Link href={`mailto:${settings.email || "maitrithanh06@gmail.com"}`}>
                Contact Me <RiArrowRightUpLine className="ml-1.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </RevealSection>
    </div>
  );
}
