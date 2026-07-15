"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { projects as fallbackProjects } from "@/data/projects";
import { ExportSquare } from "iconsax-reactjs";
import { useModuleVisibility } from "@/app/utils/useModuleVisibility";

const ProjectsPage = () => {
  const [projects, setProjects] = useState(fallbackProjects);
  const modules = useModuleVisibility("projects");

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
    modules.isVisible("content") && (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <Badge variant="outline" className="w-fit rounded-full text-xs text-muted-foreground">Portfolio</Badge>
          <CardTitle className="text-3xl">Projects</CardTitle>
          <CardDescription>
            A curated selection of products and experiments focused on clean UX and practical engineering.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.name} className="group rounded-xl border bg-muted/20 transition-colors hover:border-foreground/20">
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
              <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="p-5">
              <p className="text-xs text-muted-foreground">{project.date}</p>
              <h3 className="mt-0.5 font-medium text-foreground">{project.name}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tag.map((item) => (
                  <span key={item.tagName} className="rounded-md border bg-muted/30 px-2 py-0.5 text-xs text-foreground/60">
                    {item.tagName}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <Link href={project.preview} target="_blank" className="inline-flex items-center gap-1 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">
                  Preview <ExportSquare variant="Bulk" size={12} />
                </Link>
                <Link href={project.linkSource} target="_blank" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Source <ExportSquare variant="Bulk" size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  );
};

export default ProjectsPage;
