"use client";
import React from "react";
import Image from "next/image";
import { FcBarChart, FcLink } from "react-icons/fc";
import { IoHeartSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const CardPost = () => {
  const router = useRouter();
  return (
    <div
      className="relative w-full py-2 group hover:cursor-pointer"
      onClick={() => {
        router.push("/post/123");
      }}
    >
      <div className="relative overflow-hidden rounded-md">
        <div className=" w-[368px] h-[214px]">
          <Image
            className="border w-full hover:scale-105 transition-transform h-full"
            src={"/Thumb.webp"}
            quality={100}
            priority
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
          <div className="relative w-[32px] h-fit border rounded-full">
            <Image
              src={"/avatar/avatar.webp"}
              width={32}
              height={32}
              alt="avatar"
            />
          </div>
          <div>
            <h1 className="font-bold">Tiêu đề bài đăng</h1>
            <p className="text-xs text-gray-500">Mai Trí Thành</p>
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

export default CardPost;
