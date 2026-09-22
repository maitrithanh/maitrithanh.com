"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { menu } from "@/data/menu";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav = ({ setIsOpenMenu }: MobileNavProps) => {
  const pathName = usePathname();

  return (
    <div className="fixed right-0 top-0 flex h-screen w-72 flex-col border-l bg-background p-5 shadow-xl">
      <div className="mb-8 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpenMenu(false)}
          aria-label="Close navigation menu"
          className="w-auto px-0 text-sm font-medium"
        >
          Close
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
        {menu.map((item: any) => {
          return (
            <MenuItem
              key={item.name}
              name={item.name}
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
