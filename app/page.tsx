import InfoCard from "./components/card/InfoCard";
import Project from "./components/section/Project";

export default function Home() {
  return (
    <div className="container mx-auto my-4 max-w-[640px]">
      <InfoCard />
      <div className="mt-4">
        <Project />
      </div>
    </div>
  );
}
