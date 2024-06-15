"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  name: string;
  icon: React.ReactNode;
  pathname: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  icon,
  pathname,
  active,
}) => {
  const router = useRouter();
  return (
    <li
      className={`${
        active ? "text-black bg-gray-100 py-1 rounded-md" : "text-gray-600"
      } flex justify-start items-center px-2 cursor-pointer`}
      onClick={() => {
        router.push(pathname);
      }}
    >
      <span className="px-1 items-start">{name}</span>
    </li>
  );
};

export default MenuItem;
