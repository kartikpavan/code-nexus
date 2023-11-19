import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AskQuestionLoading = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-5">Ask Question</h1>
      <div className="flex flex-col gap-10">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-[25%]" />
      </div>
    </>
  );
};

export default AskQuestionLoading;
