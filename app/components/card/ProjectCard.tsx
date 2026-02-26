"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaRegEye } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectTag {
  icon: string;
  colorCode: string;
  tagName: string;
}

interface ProjectCardProps {
  name: string;
  date: string;
  description: string;
  image: string;
  preview: string;
  linkSource: string;
  tag: ProjectTag[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  date,
  description,
  image,
  preview,
  linkSource,
  tag,
}) => {
  return (
    <Card className="mt-6 overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
        <div className="col-span-1 flex w-full items-center justify-center">
          <Image
            src={image}
            width={660}
            height={140}
            alt={name}
            className="rounded-lg border object-cover"
          />
        </div>

        <div className="col-span-2 space-y-3 md:mt-0">
          <h1 className="text-xl font-semibold">
            {name} <span className="text-muted-foreground">• {date}</span>
          </h1>

          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Project showcase</p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {tag.map((item) => {
              return (
                <Badge
                  key={item.tagName}
                  variant="outline"
                  className="gap-1.5"
                  style={{ borderColor: item.colorCode }}
                >
                  <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    loading="lazy"
                    alt={item.tagName}
                    className="h-4 w-4"
                  />
                  {item.tagName}
                </Badge>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link target="_blank" href={preview} rel="noreferrer">
                <FaRegEye className="mr-2" />
                Preview
              </Link>
            </Button>

            <Button asChild variant="secondary" size="sm" className="rounded-full">
              <Link target="_blank" href={linkSource} rel="noreferrer">
                <FaGithub className="mr-2" />
                View Source
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
