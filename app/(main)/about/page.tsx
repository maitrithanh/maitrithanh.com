"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { RiSparklingLine, RiCodeSSlashLine, RiGraduationCapLine, RiBriefcaseLine, RiUserHeartLine } from "react-icons/ri";

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
        <Badge className="mb-4 rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
          <RiUserHeartLine className="mr-1.5" />
          About
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">About Me</h1>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>{settings.about_me || "I'm Mai Tri Thanh, a Fullstack Developer who enjoys blending solid engineering with thoughtful UI."}</p>
          <p>{settings.about_focus || "My focus is building fast web products with clean architecture, smooth interactions, and details users can feel."}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Next.js", "React", "TypeScript", "Laravel", "REST APIs"].map((skill) => (
            <Badge key={skill} className="rounded-full border-primary/20 bg-primary/5 text-xs font-medium text-primary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <Badge className="mb-4 rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
          <RiBriefcaseLine className="mr-1.5" />
          Experience
        </Badge>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Experience Highlights</h2>
        <div className="mt-5 space-y-4">
          <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
            <span className="text-sm leading-relaxed text-muted-foreground">Built responsive production interfaces and optimized performance on modern frontend stacks.</span>
          </div>
          <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
            <span className="text-sm leading-relaxed text-muted-foreground">Contributed backend APIs and data integrations to ship end-to-end features.</span>
          </div>
          <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
            <span className="text-sm leading-relaxed text-muted-foreground">Collaborated with designers to turn concepts into maintainable, reusable component systems.</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <Badge className="mb-4 rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
          <RiGraduationCapLine className="mr-1.5" />
          Education
        </Badge>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Education</h2>
        <div className="mt-5 rounded-xl border border-border/60 bg-muted/30 p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Major in Software Engineering — Ho Chi Minh City University of Foreign Languages – Information Technology (2020 - 2024)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
