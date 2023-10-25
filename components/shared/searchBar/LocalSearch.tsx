"use client";
import React from "react";
import { Input } from "@/components/ui/input";

interface Props {
  route: string;
  otherClasses: string;
  placeholder: string;
}

const LocalSearch = ({ route, otherClasses, placeholder }: Props) => {
  return (
    // <div className="max-w-5xl w-full flex items-center gap-2 px-3 py-2 bg-zinc-200 rounded-md ">
    //   <div className="hidden sm:flex">
    //     <Image src="/icons/search.svg" alt="search" height={23} width={23} />
    //   </div>
    //   <input
    //     type="text"
    //     name=""
    //     id=""
    //     className="w-full max-w-4xl bg-transparent focus:border-none focus:outline-none placeholder:text-sm"
    //     placeholder="Search Questions"
    //   />
    // </div>
    <div className="w-full">
      <Input
        value=""
        onChange={() => {}}
        type="text"
        placeholder={placeholder}
        className={`${otherClasses}`}
      />
    </div>
  );
};

export default LocalSearch;
