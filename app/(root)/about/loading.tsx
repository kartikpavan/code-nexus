import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AboutPageLoading = () => {
  return (
    <>
      <div className="space-y-1">
        <Skeleton className="h-14 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <p className="text-sm mt-5">
        I'm always open to collaboration, feedback, and connecting with fellow enthusiasts. Feel
        free to reach out via email or connect with me on social media.
      </p>

      <p className="text-sm mt-4">Thank you for being part of this journey. Happy coding! 👩‍💻🚀👨‍💻</p>
    </>
  );
};

export default AboutPageLoading;
