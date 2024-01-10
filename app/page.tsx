import InfoCard from "./components/card/InfoCard";
import Brief from "./components/section/Brief";
import Contact from "./components/section/Contact";
import Education from "./components/section/Education";
import Project from "./components/section/Project";
import Skills from "./components/section/Skills";
import Thank from "./components/section/Thank";

export default function Home() {
  return (
    <div className="container mx-auto my-4 max-w-[640px]">
      <InfoCard />
      <Brief />
      <Skills />
      <Project />
      <Education />
      <Contact />
      <Thank />
    </div>
  );
}
