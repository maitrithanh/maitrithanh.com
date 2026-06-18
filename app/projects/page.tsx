import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated selection of products and experiments by Mai Tri Thanh focused on clean UX and practical engineering.",
  openGraph: {
    title: "Projects | Mai Tri Thanh",
    description:
      "A curated selection of products and experiments focused on clean UX and practical engineering.",
    url: `${SITE_URL}/projects`,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mai Tri Thanh Projects",
      },
    ],
  },
  twitter: {
    title: "Projects | Mai Tri Thanh",
    description:
      "A curated selection of products and experiments focused on clean UX and practical engineering.",
    images: [SITE_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

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
