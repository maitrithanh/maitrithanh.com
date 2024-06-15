"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaRegEye } from "react-icons/fa";

interface ProjectCardProps {
  name: string;
  date: string;
  description: string;
  image: string;
  preview: string;
  linkSource: string;
  tag: Array<object>;
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
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 mt-8 relative pb-16 md:p-4 rounded-md group-hover:[&:not(:hover)]:opacity-50 hover:scale-110 transition-all">
      <div className="col-span-1 w-full flex justify-center items-center">
        <Image
          src={image}
          width={660}
          height={140}
          alt=""
          className="shadow rounded-lg object-cover transition-all"
        />
      </div>
      <div className="col-span-2 md:mt-0 mt-4">
        <h1 className="text-xl font-medium">
          {name} - {date}
        </h1>
        <p>{description}</p>
        <div className="flex items-center mb-8">
          {tag.map((item: any) => {
            return (
              <span
                key={item.tagName}
                className={`border border-[${item.colorCode}] mr-2 px-2 rounded-full flex items-center justify-center gap-1`}
              >
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  loading="lazy"
                  alt={item.tagName}
                  className="h-4 w-4 animateSpin transition-all"
                />
                {item.tagName}
              </span>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-1 right-36">
        <Link
          target="_blank"
          href={preview}
          className="border hover:rotate-3 hover:scale-105 transition-all rounded-full px-2 py-1 m-1 flex justify-center items-center"
        >
          <FaRegEye className="mr-2" />
          Preview
        </Link>
      </div>
      <div className="absolute bottom-1 right-1">
        <Link
          target="_blank"
          href={linkSource}
          className="border hover:-rotate-3 hover:scale-105 transition-all rounded-full px-2 py-1 m-1 flex justify-center items-center"
        >
          <FaGithub className="mr-2" />
          View Srouce
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
