import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SingleQuestionLoading = () => {
  return (
    <>
      <div className="flex items-start w-full flex-col">
        {/* User and Votes */}
        <div className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Skeleton className="h-10 w-[25%]" />
          <Skeleton className="h-10 w-[25%]" />
        </div>
        <Skeleton className="mt-3 w-full h-14" />
        {/* Stats */}
        <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-32 h-8" />
        </div>
        {/* Question Content */}
        <Skeleton className="h-72 w-full" />
        {/* Filter */}
        <div className="flex items-center justify-between w-full mt-10">
          <Skeleton className="w-[25%] h-8" />
          <Skeleton className="w-[25%] h-8" />
        </div>
        {/* All Answers */}

        <Skeleton className="h-3 w-full mt-10" />
        <Skeleton className="h-3 w-full mt-2" />
        <Skeleton className="h-3 w-full mt-2" />
        <Skeleton className="h-3 w-full mt-2" />
        <Skeleton className="h-3 w-full mt-2" />

        {/* Write Answer BOx */}
        <Skeleton className="mt-5 h-44 w-full" />

        <Skeleton className="w-[25%] h-10 mt-10" />
      </div>
    </>
  );
};

export default SingleQuestionLoading;
