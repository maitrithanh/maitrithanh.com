import React from "react";
import ContentCard from "../card/ContentCard";

const Education = () => {
  return (
    <div className="mt-4 pb-2 border-b">
      <ContentCard title="📚 Education">
        <div>
          <p className="text-xl font-semibold">Major in Software Engineering</p>
          <p className="italic text-[#7e7e7e]">
            Ho Chi Minh City University of Foreign Languages – Information
            Technology, 2020 - 2024
          </p>
        </div>
      </ContentCard>
    </div>
  );
};

export default Education;
