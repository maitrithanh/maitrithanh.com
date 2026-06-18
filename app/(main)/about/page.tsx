"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RiSparklingLine, RiBriefcaseLine, RiGraduationCapLine } from "react-icons/ri";

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
      <Card>
        <CardHeader>
          <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
            <RiSparklingLine className="mr-1.5" />
            About
          </Badge>
          <CardTitle className="text-3xl">About Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>{settings.about_me || "I'm Mai Tri Thanh, a Fullstack Developer who enjoys blending solid engineering with thoughtful UI."}</p>
          <p>{settings.about_focus || "My focus is building fast web products with clean architecture, smooth interactions, and details users can feel."}</p>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Laravel", "REST APIs"].map((skill) => (
              <Badge key={skill} className="rounded-full border-primary/20 bg-primary/5 text-xs font-medium text-primary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
            <RiBriefcaseLine className="mr-1.5" />
            Experience
          </Badge>
          <CardTitle className="text-2xl">Experience Highlights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            "Built responsive production interfaces and optimized performance on modern frontend stacks.",
            "Contributed backend APIs and data integrations to ship end-to-end features.",
            "Collaborated with designers to turn concepts into maintainable, reusable component systems.",
          ].map((text) => (
            <div key={text} className="flex gap-3 rounded-xl border border-border bg-muted/30 p-4">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
              <span className="text-sm leading-relaxed text-muted-foreground">{text}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
            <RiGraduationCapLine className="mr-1.5" />
            Education
          </Badge>
          <CardTitle className="text-2xl">Education</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Major in Software Engineering — Ho Chi Minh City University of Foreign Languages – Information Technology (2020 - 2024)
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
