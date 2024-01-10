import Image from "next/image";
import React from "react";
import { skill } from "@/data/skill";

const Skills = () => {
  return (
    <div>
      <div className="mt-4 pb-2 border-b">
        <h1 className="text-2xl font-bold">🛠 Skills</h1>
        <p className="text-[#545454] font-mono"></p>
        <p className="flex justify-center items-center py-4">
          {skill.map((item) => {
            return (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={item.name}
                className="p-1"
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
        </p>
      </div>
    </div>
  );
};

export default Skills;
