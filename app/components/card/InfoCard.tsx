"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaFacebook } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const InfoCard = () => {
  return (
    <div className="flex items-center rounded-2xl ">
      <div className="w-[80%]">
        <div className="font-semibold text-2xl">
          <Typewriter
            options={{
              strings: ["Mai Tri Thanh", "Fullstack Developer"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="group relative font-extralight bg-[#e2e2e27d] rounded-full w-fit py-1 px-2 m-1">
          <Link
            href="https://github.com/maitrithanh"
            target="_blank"
            className="flex items-center"
          >
            <FaGithub />
            <span className="mx-1">maitrithanh</span>
          </Link>

          <div className="absolute border w-fit p-1 rounded-full transition-all translate-x-24 top-0 invisible opacity-20 group-hover:visible group-hover:opacity-100 group-hover:translate-x-32">
            Github
          </div>
        </div>

        <div className="group relative font-extralight bg-[#e2e2e27d] rounded-full w-fit py-1 px-2 m-1">
          <Link
            href="https://www.facebook.com/BluMTT/"
            target="_blank"
            className="flex items-center"
          >
            <FaFacebook />
            <span className="mx-1">Blumtt</span>
          </Link>
          <div className="absolute border w-fit p-1 rounded-full transition-all translate-x-24 top-0 invisible opacity-20 group-hover:visible group-hover:opacity-100 group-hover:translate-x-32">
            Facebook
          </div>
        </div>
      </div>
      <div className="relative flex border justify-center items-center bg-[#bcb8b87d] rounded-full shadow-lg hover:border-gray-500">
        <div className="absolute h-[150px] w-[150px] flex justify-center items-center">
          <Image
            className="bounce hover:scale-110 transition-all z-20 hover:rotate-6"
            src="/ThanhAVT.png"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            alt="Avatar"
            priority
          />
          <div className="animate-ping bg-teal-400 h-[70px] w-[70px] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
