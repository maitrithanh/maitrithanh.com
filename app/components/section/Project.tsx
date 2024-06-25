import React from "react";
import ProjectCard from "../card/ProjectCard";
import { projects } from "@/data/projects";
import ContentCard from "../card/ContentCard";
const Project = () => {
  return (
    <div className="mt-4 cursor-pointer">
      <ContentCard
        title="👨🏻‍💻 Projects"
        description="Here are some of the projects i've worked on."
      >
        <div>
          <div className="mt-6 group">
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
      </ContentCard>
    </div>
  );
};

export default Project;
