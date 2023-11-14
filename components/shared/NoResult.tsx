import Image from "next/image";
import React from "react";

const NoResult = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-5">
      <Image
        src={"/icons/no-result.svg"}
        alt="no-result"
        width={50}
        height={50}
        className="object-contain rounded-full"
      />
      <h1 className="text-xl font-semibold italic text-primary">
        No Result Found
      </h1>
    </div>
  );
};

export default NoResult;
