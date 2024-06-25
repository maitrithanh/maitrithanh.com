import React, { ReactElement } from "react";

const ContentCard = ({
  title,
  children,
  description,
}: {
  title: string;
  children: React.ReactNode;
  description?: string;
}) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold sticky top-[52px] bg-[#ffffff8e] rounded-md w-fit z-10">
        {title}
      </h1>
      <div className="border-l-4 border-[#b3b3b3] pl-6 m-1">
        <p className="text-[#545454]">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default ContentCard;
