import { popularTags, topQuestions } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

const RightSidebar = () => {
  return (
    <div className="sticky right-0 top-0 flex h-screen flex-col overflow-y-auto p-6 border shadow-sm pt-36 max-sm:hidden w-[350px] max-xl:hidden">
      {/* Top Questions Section */}
      <div>
        <h3 className="text-xl font-semibold">Top Questions</h3>
        <div className="mt-5 flex flex-col gap-[30px]">
          {topQuestions.map((ques) => {
            return (
              <Link
                href={`/questions/${ques._id}`}
                key={ques._id}
                className="flex items-center justify-between cursor-pointer gap-8"
              >
                <p className="text-sm hover:underline">{ques.question}</p>
                <Image src="/icons/rightarrow.svg" alt="arrow" height={17} width={17} />
              </Link>
            );
          })}
        </div>
      </div>
      {/* Popular Tags Section */}
      <div className="mt-20">
        <h3 className="text-xl font-semibold">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-7">
          {popularTags.map((item) => {
            return (
              <RenderTag
                key={item._id}
                _id={item._id}
                name={item.name}
                totalQuestions={item.totalQuestions}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
