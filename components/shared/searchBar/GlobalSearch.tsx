"use client";
import Image from "next/image";
import React from "react";
const GlobalSearch = () => {
  return (
    <div className="max-w-5xl w-full flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-md ">
      <div className="hidden sm:flex">
        <Image src="/icons/search.svg" alt="search" height={23} width={23} />
      </div>
      <input
        type="text"
        name=""
        id=""
        className="w-full max-w-4xl bg-transparent focus:border-none focus:outline-none placeholder:text-sm"
        placeholder="Search anything globally.."
      />
    </div>
  );
};

export default GlobalSearch;