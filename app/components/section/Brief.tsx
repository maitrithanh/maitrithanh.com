import React from "react";
import ContentCard from "../card/ContentCard";

const Brief = () => {
  return (
    <div className="mt-4 pb-2 border-b">
      <div className="w-full flex justify-center my-4">
        <p className="animate-bounce">— Start —</p>
      </div>
      <div>
        <ContentCard title={`🙋🏻‍♂️ Brief introduction`}>
          <div>
            <div className="border-l-4 border-[#b3b3b3] pl-6 m-1">
              <p className="text-[#545454]">
                Hi! I&apos;m a Fullstack Developer.
              </p>
            </div>
            <p className="my-2 text-justify break-words tracking-tight">
              Software Engineer with experience in building production-level web
              and iOS applications. I specialize in developing modern,
              responsive, and performance-focused user interfaces using React,
              Next.js, and Tailwind CSS, while also contributing to backend
              systems with Laravel and RESTful APIs. With a strong attention to
              detail and a problem-solving mindset, I enjoy transforming designs
              into clean, scalable code and delivering seamless user experiences
              across platforms.
            </p>
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default Brief;
