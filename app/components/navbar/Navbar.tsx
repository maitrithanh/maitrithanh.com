"use client";
import React, { useState } from "react";
import { menu } from "@/data/menu";
import MenuItem from "./MenuItem";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import MobileNav from "./MobileNav";
import Backdrop from "../Backdrop";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-3 md:px-6">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-black/10 bg-white/75 px-4 shadow-[0_6px_18px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/75 dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] md:px-6">
        <div
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => router.push("/")}
        >
          <span className="inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-1.5 text-sm font-semibold tracking-wide text-black dark:border-white/20 dark:bg-zinc-900 dark:text-white">
            MAI TRI THANH
          </span>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {menu.map((item: any) => (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={<item.icon size={20} />}
              pathname={item.pathName}
              active={pathName === item.pathName}
            />
          ))}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          <Link
            href="https://www.buymeacoffee.com/maitrithanh"
            target="_blank"
            className="inline-block"
          >
            <Button variant="outline" size="sm" className="rounded-full border-black/20 bg-white/80 px-4 hover:bg-black hover:text-white dark:border-white/20 dark:bg-zinc-900 dark:hover:bg-white dark:hover:text-black">
              Buy me a coffee
            </Button>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpenMenu(true)}
            aria-label="Open navigation menu"
          >
            <CiMenuFries size={24} />
          </Button>
        </div>
        </div>
      </div>

      {isOpenMenu && (
        <Backdrop setIsOpenMenu={setIsOpenMenu}>
          <MobileNav setIsOpenMenu={setIsOpenMenu} />
        </Backdrop>
      )}
    </header>
  );
};

export default Navbar;
