"use client";
import React, { useEffect, useRef, useState } from "react";
import { menu } from "@/data/menu";
import MenuItem from "./MenuItem";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import MobileNav from "./MobileNav";
import Backdrop from "../Backdrop";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < 6) {
        return;
      }

      if (currentY <= 40) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      if (!isOpenMenu) {
        if (delta > 0 && currentY > 90) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpenMenu]);

  useEffect(() => {
    if (isOpenMenu) {
      setIsHeaderVisible(true);
    }
  }, [isOpenMenu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto max-w-6xl px-4 pt-3 md:px-6">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-border/60 bg-white/75 px-4 shadow-sm backdrop-blur-xl md:px-6">
          <div
            className="cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => router.push("/")}
          >
            <span className="inline-flex items-center text-sm font-semibold tracking-wide text-foreground">
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
            <Link
              href="https://www.buymeacoffee.com/maitrithanh"
              target="_blank"
              className="inline-block"
            >
              <Button variant="outline" size="sm" className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white">
                Buy me a coffee
              </Button>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
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
