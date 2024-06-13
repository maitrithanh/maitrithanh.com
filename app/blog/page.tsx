"use client";
import React, { useState } from "react";
import CardPost from "../components/Blog/CardPost";
import { CiGrid42, CiShoppingBasket } from "react-icons/ci";
import { PiAppStoreLogoThin, PiNewspaperThin } from "react-icons/pi";
import Tag from "../components/Blog/Tag";
import FilterPost from "../components/Blog/FilterPost";
import Button from "../utils/Button";

const PostPage = () => {
  const [cateFilter, setCateFilter] = useState("All");
  return (
    <div className="lg:mx-[114px] mx-4">
      <div className="relative overflow-hidden w-full bg-[#cfe2ff] h-[140px] rounded-[16px] my-4 flex justify-center items-center ">
        <div className="absolute right-[calc(50%_+_300px)]">
          <svg
            width="472"
            height="195"
            viewBox="0 0 472 195"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="156.25"
              y="38.625"
              width="77.125"
              height="77.125"
              fill="#5551FF"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              x="233.375"
              y="38.625"
              width="77.125"
              height="77.125"
              fill="#0FA958"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              x="387.625"
              y="7.1875"
              width="77.125"
              height="77.125"
              fill="#FFC700"
            ></rect>
            <line
              x1="464.562"
              y1="2.76204"
              x2="464.562"
              y2="88.9962"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></line>
            <line
              x1="469.371"
              y1="84.1871"
              x2="383.379"
              y2="84.1871"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></line>
            <line
              x1="387.386"
              y1="2.00374"
              x2="387.386"
              y2="88.9963"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></line>
            <line
              x1="471.375"
              y1="6.01131"
              x2="381.375"
              y2="6.01131"
              stroke="#1ABCFE"
              stroke-width="4.00748"
            ></line>
            <rect
              x="460.555"
              y="2.00374"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <rect
              x="460.555"
              y="80.1798"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <rect
              x="383.379"
              y="2.00374"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <rect
              x="383.379"
              y="80.1798"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <rect
              x="2"
              y="115.75"
              width="77.125"
              height="77.125"
              fill="#5551FF"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              x="79.125"
              y="115.75"
              width="77.125"
              height="77.125"
              fill="#FFC700"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              x="156.25"
              y="115.75"
              width="77.125"
              height="77.125"
              fill="#0FA958"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              x="310.5"
              y="115.75"
              width="77.125"
              height="77.125"
              fill="#5551FF"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              x="387.625"
              y="115.75"
              width="77.125"
              height="77.125"
              fill="#FFC700"
              stroke="black"
              stroke-width="4"
            ></rect>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M443.301 75.5558L406.702 53.9287L415.066 97.4249L423.825 78.5966L443.301 75.5558Z"
              fill="#0FA958"
              stroke="black"
              stroke-width="4"
              stroke-linecap="square"
            ></path>
          </svg>
        </div>
        <div className="text-center w-full">
          <h2 className="text-2xl font-semibold">My Blog</h2>
          <p className="text-lg">Updated trends, new, fast, easy, convenient</p>
        </div>
        <div className="absolute left-[calc(50%_+_300px)]">
          <svg
            width="467"
            height="164"
            viewBox="0 0 467 164"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="77.125"
              height="77.125"
              transform="matrix(-1 0 0 1 464.75 6.9375)"
              fill="#0FA958"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              width="77.125"
              height="77.125"
              transform="matrix(-1 0 0 1 310.5 6.9375)"
              fill="#5551FF"
            ></rect>
            <rect
              width="77.125"
              height="77.125"
              transform="matrix(-1 0 0 1 233.375 84.0625)"
              fill="#0FA958"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              width="77.125"
              height="77.125"
              transform="matrix(-1 0 0 1 79.125 6.9375)"
              fill="#0FA958"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              width="77.125"
              height="77.125"
              transform="matrix(-1 0 0 1 464.75 84.0625)"
              fill="#5551FF"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              width="77.125"
              height="77.125"
              transform="matrix(-1 0 0 1 156.25 84.0625)"
              fill="#5551FF"
              stroke="black"
              stroke-width="4"
            ></rect>
            <rect
              width="77.125"
              height="77.125"
              transform="matrix(-1 0 0 1 156.25 6.9375)"
              fill="#FFC700"
              stroke="black"
              stroke-width="4"
            ></rect>
            <line
              x1="310.125"
              y1="2.76204"
              x2="310.125"
              y2="88.9962"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></line>
            <line
              x1="314.934"
              y1="84.1871"
              x2="228.941"
              y2="84.1871"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></line>
            <line
              x1="232.949"
              y1="2.00374"
              x2="232.949"
              y2="88.9963"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></line>
            <line
              x1="316.938"
              y1="6.01131"
              x2="226.938"
              y2="6.01131"
              stroke="#1ABCFE"
              stroke-width="4.00748"
            ></line>
            <rect
              x="306.117"
              y="2.00374"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <rect
              x="306.117"
              y="80.1798"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <rect
              x="228.941"
              y="2.00374"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <rect
              x="228.941"
              y="80.1798"
              width="8.81645"
              height="8.81645"
              fill="white"
              stroke="#1ABCFE"
              stroke-width="4.00748"
              stroke-linecap="square"
            ></rect>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M288.864 71.7589L252.264 50.1318L260.629 93.628L269.388 74.7998L288.864 71.7589Z"
              fill="#FFC700"
              stroke="black"
              stroke-width="4"
              stroke-linecap="square"
            ></path>
          </svg>
        </div>
      </div>
      {/* Post */}
      <div className="flex">
        <div className="min-w-[250px] pr-[50px] md:block hidden">
          <div className="sticky top-[48px] z-10 py-4 bg-white">
            <ul className="text-[16px] pb-4 border-b ">
              <li
                className={`mb-1 p-3 flex items-center gap-1.5 cursor-pointer rounded-md ${
                  cateFilter == "All" ? "text-main bg-[#e5f4ff]" : null
                }`}
                onClick={() => setCateFilter("All")}
              >
                <CiGrid42 size={20} />
                All
              </li>
              <li
                className={`mb-1 p-3 flex items-center gap-1.5 cursor-pointer rounded-md ${
                  cateFilter == "News" ? "text-main bg-[#e5f4ff]" : null
                }`}
                onClick={() => setCateFilter("News")}
              >
                <PiNewspaperThin size={20} />
                Blog
              </li>
              <li
                className={`mb-1 p-3 flex items-center gap-1.5 cursor-pointer rounded-md ${
                  cateFilter == "Sale" ? "text-main bg-[#e5f4ff]" : null
                }`}
                onClick={() => setCateFilter("Sale")}
              >
                <CiShoppingBasket size={20} />
                Store
              </li>
              <li
                className={`mb-1 p-3 flex items-center gap-1.5 cursor-pointer rounded-md ${
                  cateFilter == "App" ? "text-main bg-[#e5f4ff]" : null
                }`}
                onClick={() => setCateFilter("App")}
              >
                <PiAppStoreLogoThin size={20} />
                Software
              </li>
            </ul>
            <div className="mt-4">
              <p className="font-semibold my-2">Thẻ</p>
              <div className="flex flex-wrap gap-1">
                <Tag nameTag="ReactJS" />
                <Tag nameTag="NextJS" />
                <Tag nameTag="Tailwind CSS" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="sticky top-[48px] py-4 bg-white">
            <FilterPost />
          </div>
          <div>
            {/* Blog */}
            <div>
              <div className="pt-4">
                <h2 className="border-b-2 border-main pb-2 w-fit text-2xl font-semibold">
                  Blog
                </h2>
              </div>
              <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 ">
                {/* <CardPost /> */}
              </div>
              <div className="w-full flex justify-center items-center mt-8">
                Nothing...
              </div>
              {/* <div className="flex justify-center items-center p-4">
                <Button
                  name={"Read more..."}
                  onclick={() => {}}
                  custom="py-2 px-4"
                  outline
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
