"use client";
import { useEffect } from "react";
import InfoCard from "./components/card/InfoCard";
import Brief from "./components/section/Brief";
import Contact from "./components/section/Contact";
import Education from "./components/section/Education";
import Project from "./components/section/Project";
import Skills from "./components/section/Skills";
import Thank from "./components/section/Thank";

export default function Home() {
  useEffect(() => {
    const education = document.getElementById("Education");
    const contact = document.getElementById("Contact");
    const thank = document.getElementById("Thank");

    const isIntoView = (element: HTMLElement | any) => {
      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight;
    };

    window.addEventListener("scroll", () => {
      if (isIntoView(education)) {
        education?.classList.add("animateRightToLeft");
        education?.classList.remove("invisible");
      }
      if (isIntoView(contact)) {
        contact?.classList.add("animateLeftToRight");
        contact?.classList.remove("invisible");
      }
      if (isIntoView(thank)) {
        thank?.classList.add("animateRightToLeft");
        thank?.classList.remove("invisible");
      }
    });
  }, []);

  return (
    <div>
      <div className="p-2 mx-auto my-4 max-w-[640px]">
        <InfoCard />
        <div id="Brief" className="animateLeftToRight">
          <Brief />
        </div>
        <div id="Skills" className="animateRightToLeft">
          <Skills />
        </div>
        <div id="Project" className="animateLeftToRight">
          <Project />
        </div>
        <div id="Education" className="invisible">
          <Education />
        </div>
        <div id="Contact" className="invisible">
          <Contact />
        </div>
        <div id="Thank" className="invisible">
          <Thank />
        </div>
      </div>
    </div>
  );
}
