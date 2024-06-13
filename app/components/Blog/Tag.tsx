import React from "react";

interface TagProps {
  nameTag: string;
}
const Tag: React.FC<TagProps> = ({ nameTag }) => {
  return (
    <div className="p-1 px-2 text-sm rounded-md border w-fit font-light">
      {nameTag}
    </div>
  );
};

export default Tag;
