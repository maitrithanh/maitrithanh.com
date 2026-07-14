"use client";
import React, { useEffect, useRef, useState } from "react";
import { menu } from "@/data/menu";
import MenuItem from "./MenuItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HamburgerMenu } from "iconsax-reactjs";
import MobileNav from "./MobileNav";
import Backdrop from "../Backdrop";
import { Button } from "@/components/ui/button";
const Navbar = () => {
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
        <div className="mx-auto max-w-6xl px-4 md:px-6 bg-white">
        <div className="flex h-14 items-center justify-between border-b border-border md:h-16">
          <Link
            href="/"
            prefetch
            className="inline-flex cursor-pointer items-center transition-opacity hover:opacity-80"
          >
            <span className="inline-flex items-center text-sm font-semibold tracking-wide text-foreground">
              MAI TRI THANH
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {menu.map((item: any) => (
              <MenuItem
                key={item.name}
                name={item.name}
                icon={<item.icon size={20} variant="Bulk" />}
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
              <Button variant="outline" size="sm" className="rounded-full border-pri bg-primary text-white">
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
              <HamburgerMenu variant="Bulk" size={24} />
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
