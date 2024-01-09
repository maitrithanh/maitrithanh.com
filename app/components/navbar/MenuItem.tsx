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
        active ? "font-bold" : ""
      } flex justify-start items-center px-2 cursor-pointer hover:font-medium`}
      onClick={() => {
        router.push(pathname);
      }}
    >
      <span className="px-1 items-start">{name}</span>
    </li>
  );
};

export default MenuItem;
