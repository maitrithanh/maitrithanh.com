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
    <>
      <div className="h-[52px] flex justify-between items-center px-4">
        <div
          className="max-w-[200px] cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src="/logo.png" width={80} height={50} alt="logo" />
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
        <div className="px-2">
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
        <Backdrop>
          <MobileNav setIsOpenMenu={setIsOpenMenu} />
        </Backdrop>
      )}
    </>
  );
};

export default Navbar;
