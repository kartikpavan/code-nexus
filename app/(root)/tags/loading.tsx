import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TagsPageLoading = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold">All Tags</h1>
      <div className="flex mt-8 w-full justify-between gap-5 max-sm:flex-col-reverse sm:items-center">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-full sm:w-28 " />
      </div>
      <div className="flex items-center flex-wrap gap-x-5 gap-y-10 mt-10">
        {Array.from({ length: 10 }, (_, idx) => (
          <div key={idx} className="sm:max-w-[250px] w-full">
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TagsPageLoading;
