import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileEditLoading = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-5">Edit Profile</h1>
      <div className="flex flex-col gap-10">
        {Array.from({ length: 5 }, (_, idx) => {
          return <Skeleton key={idx + 1} className="h-10 w-full" />;
        })}
      </div>
      <Skeleton className="h-12 w-32 mt-5" />
    </>
  );
};

export default ProfileEditLoading;
