"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects as fallbackProjects } from "@/data/projects";

const ProjectsPage = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(data.map((p: any) => ({
            name: p.name, date: p.date, description: p.description || "", image: p.image,
            preview: p.preview, linkSource: p.link_source, tag: p.tags || [],
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Portfolio</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Projects</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          A curated selection of products and experiments focused on clean UX and practical engineering.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.name} className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs text-muted-foreground">{project.date}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{project.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tag.map((item) => (
                  <Badge key={item.tagName} variant="outline" className="border-border/60 bg-muted/30 text-xs text-foreground/70">
                    {item.tagName}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <Link href={project.preview} target="_blank">Preview</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href={project.linkSource} target="_blank">Source</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
