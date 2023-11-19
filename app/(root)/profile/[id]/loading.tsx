import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="h-[140px] w-[140px] rounded-full" />
          <div className="mt-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-24 mt-2" />
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              <Skeleton className="h-2 w-32 mt-2" />
              <Skeleton className="h-2 w-32 mt-1" />
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Skeleton className="w-24 h-10" />
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold">Stats</h3>
        <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-6 w-full">
        {Array.from({ length: 2 }, (_, idx) => (
          <Skeleton key={idx} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
};

export default ProfileLoading;
