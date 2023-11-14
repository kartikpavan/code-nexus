import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";

const NoResult = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-5">
      <Image
        src={"/images/no-result.png"}
        alt="no-result"
        width={400}
        height={400}
      />
      <Badge variant="secondary" className="text-lg">
        No Results found
      </Badge>
    </div>
  );
};

export default NoResult;
