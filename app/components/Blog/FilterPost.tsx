"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterPost = () => {
  return (
    <>
      <div className="bg-white z-10 sticky top-[48px]">
        <div className="flex justify-between items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All content" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                {/* <SelectItem value="apple">Săn sale</SelectItem> */}
                <SelectItem value="pineapple">Blog</SelectItem>
                <SelectItem value="banana">Store</SelectItem>
                <SelectItem value="grapes">Software </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                {/* <SelectItem value="apple">Săn sale</SelectItem> */}
                <SelectItem value="grapes">Popular</SelectItem>
                <SelectItem value="pineapple">Lastest</SelectItem>
                <SelectItem value="banana">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default FilterPost;
