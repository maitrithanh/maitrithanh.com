"use client";
import React, { useState } from "react";
import { menu } from "@/data/menu";
import MenuItem from "./MenuItem";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import MobileNav from "./MobileNav";
import Backdrop from "../Backdrop";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className="w-full flex justify-center h-[52px] bg-white fixed top-0 z-40">
      <div className="flex justify-between items-center px-4 container mx-auto max-w-[640px] ">
        <div
          className="max-w-[80px] max-h-[52px] cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="/logo.png"
            width={52}
            height={52}
            alt="logo"
            className="flex"
          />
        </div>
        <ul className="hidden justify-center items-center md:flex">
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

        <div className="px-2  md:visible invisible">
          <Link href="https://www.buymeacoffee.com/maitrithanh" target="_blank">
            <Image
              src="/default-yellow.png"
              width={120}
              height={20}
              alt="Buy me coffee"
            />
          </Link>
        </div>

        <div
          className="p-2 sm:flex md:hidden"
          onClick={() => {
            setIsOpenMenu(true);
          }}
        >
          <CiMenuFries size={24} />
        </div>
      </div>
      {isOpenMenu && (
        <Backdrop setIsOpenMenu={setIsOpenMenu}>
          <MobileNav setIsOpenMenu={setIsOpenMenu} />
        </Backdrop>
      )}
    </div>
  );
};

export default Navbar;
