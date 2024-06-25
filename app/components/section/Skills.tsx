import Image from "next/image";
import React from "react";
import { skill } from "@/data/skill";
import ContentCard from "../card/ContentCard";

const Skills = () => {
  return (
    <div>
      <div className="mt-4 pb-2 border-b">
        <ContentCard title={`🛠 Skills`}>
          <div className="flex justify-center items-center py-4 h-[76px]">
            {skill.map((item) => {
              return (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  key={item.name}
                  title={item.name}
                  className="p-1 hover:mb-4 hover:scale-125 transition-all"
                >
                  <Image
                    src={item.image}
                    width="36"
                    height="36"
                    alt={item.name}
                  />
                </a>
              );
            })}
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default Skills;
