import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const EditQuestionLoading = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-5">Edit Question</h1>
      <div className="flex flex-col gap-10">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-[25%]" />
      </div>
    </>
  );
};

export default EditQuestionLoading;
