import React from "react";
import ProjectCard from "../card/ProjectCard";
import { projects } from "@/data/projects";
const Project = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-[#545454] font-mono">
          Here are some of the projects i{"'"}ve worked on.
        </p>
      </div>
      <div className="mt-6">
        {projects.map((project) => {
          return (
            <ProjectCard
              key={project.name}
              name={project.name}
              date={project.date}
              description={project.description}
              image={project.image}
              preview={project.preview}
              linkSource={project.linkSource}
              tag={project.tag}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Project;
