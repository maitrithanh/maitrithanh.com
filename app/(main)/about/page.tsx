"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useModuleVisibility } from "@/app/utils/useModuleVisibility";

const AboutPage = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const modules = useModuleVisibility("about");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => Object.keys(d).length && setSettings(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-10">
      {modules.isVisible("bio") && (
      <Card>
        <CardHeader>
          <Badge variant="outline" className="w-fit rounded-full text-xs text-muted-foreground">About</Badge>
          <CardTitle className="text-3xl">About Me</CardTitle>
        </CardHeader>
        <CardContent className="max-w-prose space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>{settings.about_me || "I'm Mai Tri Thanh, a Fullstack Developer who enjoys blending solid engineering with thoughtful UI."}</p>
          <p>{settings.about_focus || "My focus is building fast web products with clean architecture, smooth interactions, and details users can feel."}</p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {["Next.js", "React", "TypeScript", "Laravel", "REST APIs"].map((skill) => (
              <span key={skill} className="rounded-md border bg-muted/30 px-2.5 py-0.5 text-xs text-foreground/70">{skill}</span>
            ))}
          </div>
        </CardContent>
      </Card>
      )}

      {modules.isVisible("experience") && (
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Experience</h2>
        <div className="mt-4 space-y-3">
          {[
            "Built responsive production interfaces and optimized performance on modern frontend stacks.",
            "Contributed backend APIs and data integrations to ship end-to-end features.",
            "Collaborated with designers to turn concepts into maintainable, reusable component systems.",
          ].map((text) => (
            <div key={text} className="flex gap-3 border-l-2 border-border pl-4">
              <span className="text-sm leading-relaxed text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </div>
      )}

      {modules.isVisible("education") && (
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Education</h2>
        <div className="mt-4 border-l-2 border-border pl-4">
          <p className="font-medium text-foreground">Software Engineering</p>
          <p className="text-sm text-muted-foreground">Ho Chi Minh City University of Foreign Languages – Information Technology</p>
          <p className="mt-0.5 text-xs text-muted-foreground/60">2020 – 2024 · GPA 3.2/4.0</p>
        </div>
      </div>
      )}
    </div>
  );
};

export default AboutPage;
