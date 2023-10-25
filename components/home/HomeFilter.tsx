"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

const HomeFilter = () => {
  const isActive = "frequent";
  return (
    <div className="max-md:hidden flex flex-wrap gap-4 mt-5">
      {HomePageFilters.map((item) => {
        return (
          <Button
            key={item.value}
            onClick={() => {}}
            variant="ghost"
            size="sm"
            className={`text-sm ${
              isActive === item.value
                ? "bg-primary text-white"
                : "border text-primary border-primary"
            }`}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilter;
