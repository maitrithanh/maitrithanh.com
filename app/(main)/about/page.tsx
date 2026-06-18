"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const AboutPage = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => Object.keys(d).length && setSettings(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">About</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">About Me</h1>
        </div>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>{settings.about_me || "I'm Mai Tri Thanh, a Fullstack Developer who enjoys blending solid engineering with thoughtful UI."}</p>
          <p>{settings.about_focus || "My focus is building fast web products with clean architecture, smooth interactions, and details users can feel."}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Next.js", "React", "TypeScript", "Laravel", "REST APIs"].map((skill) => (
            <Badge key={skill} variant="outline" className="border-border/60 bg-muted/30 text-xs text-foreground/80">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Experience</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Experience Highlights</h2>
        </div>
        <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground/30" />
            <span>Built responsive production interfaces and optimized performance on modern frontend stacks.</span>
          </div>
          <div className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground/30" />
            <span>Contributed backend APIs and data integrations to ship end-to-end features.</span>
          </div>
          <div className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground/30" />
            <span>Collaborated with designers to turn concepts into maintainable, reusable component systems.</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Education</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Education</h2>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Major in Software Engineering — Ho Chi Minh City University of Foreign Languages – Information Technology (2020 - 2024)
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
