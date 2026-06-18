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
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
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
    <div className="space-y-10 pb-16 md:space-y-14">
      <section className="grid gap-5 md:grid-cols-5">
        <FadeIn delay={0.1}>
          <Card className="md:col-span-3">
            <CardHeader>
              <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
                <RiSparklingLine className="mr-1.5" />
                {settings.hero_badge || "Building clean web experiences"}
              </Badge>
              <CardTitle className="text-4xl leading-tight md:text-5xl lg:text-6xl">
                {HERO_NAME}
              </CardTitle>
              <CardDescription className="mt-1 max-w-lg text-base md:text-lg">
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

        <FadeIn delay={0.2}>
          <Card className="md:col-span-2">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Focus</p>
              <CardTitle className="text-2xl">Web Developer</CardTitle>
              <CardDescription className="flex flex-wrap gap-x-2 text-lg">
                <span>React</span><span className="text-border">•</span>
                <span>Next.js</span><span className="text-border">•</span>
                <span>Laravel</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <RiMapPinLine className="shrink-0 text-primary" />
                <span>{settings.location || "Ho Chi Minh City"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RiMailLine className="shrink-0 text-primary" />
                <a href={`mailto:${settings.email || "maitrithanh06@gmail.com"}`} className="transition-colors hover:text-foreground">
                  {settings.email || "maitrithanh06@gmail.com"}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <RiPhoneLine className="shrink-0 text-primary" />
                <span>{settings.phone || "+84 325575029"}</span>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      <RevealSection>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex flex-col items-center p-6">
                <stat.icon className="mb-2 text-2xl text-primary" />
                <p className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
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
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {skills.slice(0, 12).map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/30 p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background p-2">
                    <Image src={item.image} alt={item.name} width={24} height={24} className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-foreground/80">{item.name}</span>
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
              <Badge className="rounded-lg border-primary/20 bg-primary/10 px-2 py-1 text-sm font-semibold text-primary">
                01
              </Badge>
              <CardTitle>Work Journey</CardTitle>
            </div>
            <CardDescription>Experience and profile highlights from my CV.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <div key={`${item.company}-${item.period}`} className="relative pl-14">
                  <Badge className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border-primary/20 bg-primary/10 p-0 text-sm font-bold text-primary ring-4 ring-background">
                    {String(idx + 1).padStart(2, "0")}
                  </Badge>
                  <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.role}
                        <span className="text-muted-foreground"> · </span>
                        <span className="font-normal text-muted-foreground">{item.company}</span>
                      </h3>
                      <span className="text-xs text-muted-foreground">{item.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.location}</p>
                    <ul className="mt-3 space-y-2">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Education</p>
                  <p className="mt-2 text-sm text-foreground">{quickInfo.education}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Core Skills</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {quickInfo.coreSkills.map((s) => (
                      <Badge key={s} variant="outline" className="border-primary/20 bg-primary/5 text-xs font-medium text-primary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                  className="group overflow-hidden rounded-xl border border-border bg-muted/30 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                    <h3 className="mt-1 line-clamp-2 font-medium text-foreground">{project.name}</h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Preview <FaArrowUpRightFromSquare className="text-xs" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </RevealSection>

      <RevealSection>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-6 p-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <CardTitle className="text-xl">
                {settings.cta_title || "Let's build something memorable."}
              </CardTitle>
              <CardDescription className="mt-1">
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
