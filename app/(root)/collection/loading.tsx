import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CollectionPageLoading = () => {
  return (
    <>
      <div className="w-full flex flex-col-reverse justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-semibold">Saved Questions</h1>
      </div>
      {/* Search and filter */}
      <div className="flex mt-8 w-full justify-between gap-5 max-sm:flex-col-reverse sm:items-center">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-full sm:w-28 " />
      </div>

      <div className="mt-10 flex flex-col gap-6 w-full">
        {Array.from({ length: 4 }, (_, idx) => (
          <Skeleton key={idx} className="h-32 w-full" />
        ))}
      </div>
    </>
  );
};

export default CollectionPageLoading;
