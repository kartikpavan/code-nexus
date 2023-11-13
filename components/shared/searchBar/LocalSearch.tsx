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
