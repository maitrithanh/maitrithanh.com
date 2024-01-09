"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { menu } from "@/data/menu";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";

const MobileNav = ({ setIsOpenMenu }: any) => {
  const pathName = usePathname();
  return (
    <div className="fixed flex h-screen w-52 top-0 right-0 bg-white justify-center text-2xl transition-all">
      <div
        className="absolute right-0 p-4"
        onClick={() => {
          setIsOpenMenu(false);
        }}
      >
        <IoMdClose />
      </div>
      <ul className="mt-20">
        {menu.map((item: any) => {
          return (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={<item.icon size={22} />}
              pathname={item.pathName}
              active={pathName === item.pathName}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MobileNav;
