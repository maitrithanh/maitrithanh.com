"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { projects as fallbackProjects } from "@/data/projects";
import { RiSparklingLine, RiArrowRightUpLine } from "react-icons/ri";

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
      <Card>
        <CardHeader>
          <Badge className="w-fit rounded-full border-primary/20 bg-primary/10 text-xs font-medium text-primary">
            <RiSparklingLine className="mr-1.5" />
            Portfolio
          </Badge>
          <CardTitle className="text-3xl">Projects</CardTitle>
          <CardDescription>
            A curated selection of products and experiments focused on clean UX and practical engineering.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.name} className="overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="text-xs text-muted-foreground">{project.date}</p>
                <CardTitle className="mt-1 text-lg">{project.name}</CardTitle>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tag.map((item) => (
                  <Badge key={item.tagName} className="rounded-full border-primary/20 bg-primary/5 text-xs font-medium text-primary">
                    {item.tagName}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <Link href={project.preview} target="_blank">
                    Preview <RiArrowRightUpLine className="ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href={project.linkSource} target="_blank">Source</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
