import React from "react";
import Brief from "../components/section/Brief";
import Skills from "../components/section/Skills";

const AboutPage = () => {
  return (
    <div className="container mx-auto my-4 max-w-[640px]">
      <Skills />
      <Brief />
    </div>
  );
};

export default AboutPage;
