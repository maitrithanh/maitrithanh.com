"use client";
import React from "react";
import Image from "next/image";
import { FcBarChart, FcLink } from "react-icons/fc";
import { IoHeartSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const CardPostRelated = () => {
  const router = useRouter();
  return (
    <div
      className="relative w-full py-2 group hover:cursor-pointer"
      onClick={() => {
        router.push("/post/123");
      }}
    >
      <div className="relative overflow-hidden rounded-md">
        <div className="relative w-[368px] h-[218px]">
          <Image
            className="border w-full hover:scale-105 transition-transform"
            src={"/Thumb.webp"}
            priority
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            alt="Thumbnail"
          />
        </div>
        <div className="absolute right-2 bottom-2 invisible group-hover:visible">
          <FcLink size={20} />
        </div>
      </div>
      <div className="lg:flex block justify-between items-center gap-2 mt-3 text-sm">
        <div className="flex items-center gap-2">
          <div>
            <p className="font-semibold">Tiêu đề bài đăng</p>
          </div>
        </div>

        <div className="flex gap-2 text-gray-500">
          <div className="flex items-center gap-[2px]">
            <span className="text-rose-600">
              <IoHeartSharp />
            </span>
            100
          </div>
          <div className="flex items-center gap-[2px]">
            <span>
              <FcBarChart />
            </span>
            1000
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPostRelated;
