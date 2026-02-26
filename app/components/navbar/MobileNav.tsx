"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { menu } from "@/data/menu";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav = ({ setIsOpenMenu }: MobileNavProps) => {
  const pathName = usePathname();

  return (
    <div className="fixed right-0 top-0 flex h-screen w-72 flex-col border-l border-black/10 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/85">
      <div className="mb-8 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpenMenu(false)}
          aria-label="Close navigation menu"
        >
          <IoMdClose className="h-6 w-6" />
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
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
