"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RiSparklingLine, RiBriefcaseLine, RiGraduationCapLine, RiCodeSSlashLine, RiUserHeartLine } from "react-icons/ri";

const AboutPage = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => Object.keys(d).length && setSettings(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <RiUserHeartLine className="mr-1.5" />
            About
          </Badge>
          <CardTitle className="text-3xl">About Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p className="text-base">{settings.about_me || "I'm Mai Tri Thanh, a Fullstack Developer who enjoys blending solid engineering with thoughtful UI."}</p>
          <p>{settings.about_focus || "My focus is building fast web products with clean architecture, smooth interactions, and details users can feel."}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Next.js", "React", "TypeScript", "Laravel", "REST APIs"].map((skill) => (
              <Badge key={skill} className="rounded-md border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <RiBriefcaseLine className="text-sm text-primary" />
            </div>
            <CardTitle>Experience Highlights</CardTitle>
          </div>
          <CardDescription>Key achievements across my career.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "Built responsive production interfaces and optimized performance on modern frontend stacks.",
            "Contributed backend APIs and data integrations to ship end-to-end features.",
            "Collaborated with designers to turn concepts into maintainable, reusable component systems.",
          ].map((text) => (
            <div key={text} className="flex gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 transition-all hover:border-primary/20 hover:shadow-sm">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
              <span className="text-sm leading-relaxed text-muted-foreground">{text}</span>
            </div>
          ))}
        </CardContent>
      </Card>

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
                <p className="text-sm font-medium text-foreground">
                  Software Engineering — Ho Chi Minh City University of Foreign Languages – Information Technology
                </p>
                <p className="mt-1 text-xs text-muted-foreground">2020 - 2024 · GPA 3.2/4.0</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
