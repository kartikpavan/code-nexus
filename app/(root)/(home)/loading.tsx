import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HomePageLoading = () => {
  return (
    <>
      <div className="w-full flex flex-col-reverse justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-semibold">All Questions</h1>
        <div className="flex justify-end max-sm:w-full">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      {/* Search and filter */}
      <div className="flex mt-8 w-full justify-between gap-5 max-sm:flex-col-reverse sm:items-center">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-full sm:w-28 " />
      </div>
      <div className="max-md:hidden flex flex-wrap gap-4 mt-5">
        {Array.from({ length: 4 }, (_, idx) => {
          return (
            <div key={idx + 1}>
              <Skeleton className="h-10 w-20" />
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex flex-col gap-6 w-full">
        {Array.from({ length: 4 }, (_, idx) => (
          <Skeleton key={idx} className="h-32 w-full" />
        ))}
      </div>
    </>
  );
};

export default HomePageLoading;
