import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

const ProjectsPage = () => {
  return (
    <div className="space-y-6">
      <Card className="neo-glass">
        <CardHeader>
          <CardTitle className="text-3xl">Projects</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          A curated selection of products and experiments focused on clean UX and practical engineering.
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.name} className="neo-glass overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="text-xs text-muted-foreground">{project.date}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{project.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tag.map((item) => (
                  <Badge key={item.tagName} variant="outline" className="border-black/15 bg-white/70 dark:border-white/20 dark:bg-zinc-900">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
