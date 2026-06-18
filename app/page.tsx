"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WaveText } from "@/components/ui/wave-text";
import { projects as fallbackProjects } from "@/data/projects";
import { skill as fallbackSkills } from "@/data/skill";
import { careerTimeline as fallbackTimeline, cvQuickInfo as fallbackQuickInfo } from "@/data/cv";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import {
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
  RiSparklingLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiCodeSSlashLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

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
  const [quickInfo, setQuickInfo] = useState(fallbackQuickInfo);
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

  return (
    <div className="space-y-10 pb-16 md:space-y-14">
      <section className="grid gap-5 md:grid-cols-5">
        <FadeIn delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-sm md:col-span-3">
            <div className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-inset ring-black/[0.03] dark:ring-white/[0.03]" />
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-border bg-muted/50 text-xs text-muted-foreground"
            >
              <RiSparklingLine className="mr-1.5" />
              {settings.hero_badge || "Building clean web experiences"}
            </Badge>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <WaveText text={HERO_NAME} />
            </h1>
            <p className="mt-3 max-w-lg text-base text-muted-foreground md:text-lg">
              {settings.hero_subtitle || "Fullstack Developer crafting modern, fast and delightful products."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:col-span-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Focus</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">Web Developer</h2>
              <div className="mt-1 flex flex-wrap gap-x-2 text-lg text-muted-foreground">
                <span>React</span><span className="text-border">•</span>
                <span>Next.js</span><span className="text-border">•</span>
                <span>Laravel</span>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <RiMapPinLine className="shrink-0" />
                <span>{settings.location || "Ho Chi Minh City"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RiMailLine className="shrink-0" />
                <a href={`mailto:${settings.email || "maitrithanh06@gmail.com"}`} className="transition-colors hover:text-foreground">
                  {settings.email || "maitrithanh06@gmail.com"}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <RiPhoneLine className="shrink-0" />
                <span>{settings.phone || "+84 325575029"}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <RevealSection>
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <RiBriefcaseLine className="text-xl text-foreground" />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Work Journey</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Experience and profile highlights from my CV.</p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <div className="absolute bottom-4 left-[15px] top-4 w-px bg-border" />
              {timeline.map((item) => (
                <div key={`${item.company}-${item.period}`} className="relative mb-5 rounded-xl border border-border/60 bg-muted/30 p-5 pl-9 last:mb-0">
                  <span className="absolute left-[11px] top-6 h-2 w-2 rounded-full bg-foreground ring-2 ring-background" />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold text-foreground">
                      {item.role} <span className="text-muted-foreground">·</span>{" "}
                      <span className="font-normal text-muted-foreground">{item.company}</span>
                    </h3>
                    <span className="text-xs text-muted-foreground">{item.period}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.location}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <RiGraduationCapLine /> Education
                </p>
                <p className="mt-2 text-sm text-foreground">{quickInfo.education}</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <RiCodeSSlashLine /> Core Skills
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {quickInfo.coreSkills.map((s) => (
                    <span key={s} className="rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-foreground">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Tech Stack</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.slice(0, 12).map((item) => (
              <a key={item.name} href={item.link} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-2 text-sm text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-muted/50 hover:text-foreground hover:shadow-sm"
              >
                <Image src={item.image} alt={item.name} width={16} height={16} className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Featured Projects</h2>
            <Button asChild variant="ghost" className="rounded-full text-sm">
              <Link href="/projects">See all <RiArrowRightUpLine className="ml-1" /></Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Link href={project.preview} target="_blank" key={project.name}
                className="group overflow-hidden rounded-xl border border-border/60 bg-muted/30 transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{project.date}</p>
                  <h3 className="mt-1 line-clamp-2 font-medium text-foreground">{project.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                    Preview <FaArrowUpRightFromSquare className="text-xs" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {settings.cta_title || "Let's build something memorable."}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {settings.cta_subtitle || "Open for freelance, product, and startup collaborations."}
              </p>
            </div>
            <Button asChild className="rounded-full px-6 shadow-sm">
              <Link href={`mailto:${settings.email || "maitrithanh06@gmail.com"}`}>
                Contact Me <RiArrowRightUpLine className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
