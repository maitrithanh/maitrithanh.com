"use client";
import { useEffect } from "react";
import { animate, createTimeline, stagger } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaveText } from "@/components/ui/wave-text";
import { projects } from "@/data/projects";
import { skill } from "@/data/skill";
import { careerTimeline, cvQuickInfo } from "@/data/cv";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import {
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
  RiSparklingLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiCodeSSlashLine,
  RiDoubleQuotesL,
} from "react-icons/ri";

const HERO_NAME = "Mai Tri Thanh";

export default function Home() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const heroItems = document.querySelectorAll<HTMLElement>(
      "[data-anime='hero']",
    );

    createTimeline({
      defaults: {
        duration: 850,
        ease: "out(3)",
      },
    }).add(heroItems, {
      opacity: [0, 1],
      y: [28, 0],
      delay: stagger(110),
    });

    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-anime='reveal']"),
    );
    const revealed = new WeakSet<HTMLElement>();

    const revealInView = () => {
      revealItems.forEach((element) => {
        if (revealed.has(element)) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.88;

        if (!isInView) {
          return;
        }

        revealed.add(element);

        const direction = element.dataset.direction ?? "up";
        const moveX =
          direction === "left" ? -26 : direction === "right" ? 26 : 0;

        animate(element, {
          opacity: [0, 1],
          x: [moveX, 0],
          y: [18, 0],
          duration: 780,
          ease: "outExpo",
          complete: () => {
            element.style.transform = "none";
            element.style.opacity = "1";
          },
        });
      });
    };

    revealInView();
    window.addEventListener("scroll", revealInView, { passive: true });

    const cleanups: Array<() => void> = [];

    const hoverCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-anime-hover-card='true']"),
    );

    // hoverCards.forEach((card) => {
    //   const onEnter = () => {
    //     animate(card, {
    //       scale: 1.008,
    //       y: -2,
    //       duration: 260,
    //       ease: "out(4)",
    //     });
    //   };

    //   const onLeave = () => {
    //     animate(card, {
    //       scale: 1,
    //       y: 0,
    //       duration: 300,
    //       ease: "out(3)",
    //       complete: () => {
    //         card.style.transform = "none";
    //       },
    //     });
    //   };

    //   card.addEventListener("mouseenter", onEnter);
    //   card.addEventListener("mouseleave", onLeave);
    //   cleanups.push(() => {
    //     card.removeEventListener("mouseenter", onEnter);
    //     card.removeEventListener("mouseleave", onLeave);
    //   });
    // });

    return () => {
      window.removeEventListener("scroll", revealInView);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="space-y-8 pb-10 md:space-y-10">
      <section className="grid gap-4 md:grid-cols-5">
        <Card
          data-anime="hero"
          className="neo-glass relative overflow-hidden md:col-span-3"
        >
          <CardContent className="relative p-7 md:p-8">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-black/20 bg-white text-black"
            >
              <RiSparklingLine className="mr-1.5" />
              Building clean web experiences
            </Badge>

            <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              <WaveText text={HERO_NAME} />
            </h1>
            <p className="mt-2 text-base text-muted-foreground md:text-lg">
              Fullstack Developer crafting modern, fast and delightful products.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild className="rounded-full px-5">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-5">
                <Link href="/about">About Me</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-5">
                <Link
                  href="/CV_MaiTriThanh.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  My Resume
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card data-anime="hero" className="neo-glass md:col-span-2">
          <CardContent className="flex h-full flex-col justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Focus</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Web Developer
              </h2>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                React • Next.js • Laravel
              </h2>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="inline-flex items-center gap-2">
                <RiMapPinLine /> Ho Chi Minh City
              </p>
              <br />
              <p className="inline-flex items-center gap-2">
                <RiMailLine /> maitrithanh06@gmail.com
              </p>
              <br />
              <p className="inline-flex items-center gap-2">
                <RiPhoneLine /> +84 325575029
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section
        data-anime="reveal"
        data-direction="left"
        className="anime-reveal"
      >
        <Card className="neo-glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-2xl">
              <RiBriefcaseLine className="text-xl" />
              Work Journey
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Experience and profile highlights from your CV.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-2">
                <span className="absolute bottom-5 left-[17px] top-5 w-px bg-black/15 dark:bg-white/20" />
                {careerTimeline.map((item) => (
                  <div
                    key={`${item.company}-${item.period}`}
                    className="relative rounded-xl mb-4 border border-black/10 bg-white p-4 pl-8 dark:border-white/10 dark:bg-zinc-900"
                  >
                    <span className="absolute left-3.5 top-5 h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />

                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <h3 className="font-semibold text-foreground">
                        {item.role} · {item.company}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.location}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
                  <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                    <RiGraduationCapLine />
                    Education
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    {cvQuickInfo.education}
                  </p>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
                  <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                    <RiCodeSSlashLine />
                    Core Skills
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cvQuickInfo.coreSkills.map((skillItem) => (
                      <span
                        key={skillItem}
                        className="rounded-full border border-black/15 px-2.5 py-1 text-xs text-foreground dark:border-white/20"
                      >
                        {skillItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
                  <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                    <RiDoubleQuotesL />
                    Personal Motto
                  </p>
                  <p className="mt-2 text-sm italic text-foreground/90">
                    {cvQuickInfo.quote}
                  </p>
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section
        data-anime="reveal"
        data-direction="left"
        className="anime-reveal"
      >
        <Card className="neo-glass">
          <CardHeader>
            <CardTitle className="text-2xl">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skill.slice(0, 12).map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-2 text-sm text-black/80 transition-all hover:-translate-y-0.5 hover:shadow-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white/80 "
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section
        data-anime="reveal"
        data-direction="right"
        className="anime-reveal"
      >
        <Card className="neo-glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Featured Projects</CardTitle>
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/projects">See all</Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Link
                href={project.preview}
                target="_blank"
                key={project.name}
                className="group overflow-hidden rounded-xl border border-black/10 bg-white transition-all dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    {project.date}
                  </p>
                  <h3 className="mt-1 line-clamp-2 font-medium text-foreground">
                    {project.name}
                  </h3>
                  <span className="mt-3 inline-flex items-center text-sm text-foreground">
                    Preview{" "}
                    <FaArrowUpRightFromSquare className="ml-1 text-xs" />
                  </span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section
        data-anime="reveal"
        data-direction="left"
        className="anime-reveal"
      >
        <Card className="neo-glass">
          <CardContent className="flex flex-col items-center justify-between gap-4 p-6 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Let&apos;s build something memorable.
              </h2>
              <p className="text-sm text-muted-foreground">
                Open for freelance, product, and startup collaborations.
              </p>
            </div>
            <Button asChild className="rounded-full">
              <Link href="mailto:maitrithanh06@gmail.com">Contact Me</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
