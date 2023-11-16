"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { createCustomURL } from "@/lib/utils";

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>("");

  const handleChangeFilter = (item: string) => {
    if (activeFilter !== item) {
      setActiveFilter(item);
      const newURL = createCustomURL({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newURL, { scroll: false });
    } else {
      // if same filter is clicked again then remove the query from the URL
      // and set the active filter to null or empty
      setActiveFilter("");
      const newURL = createCustomURL({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newURL, { scroll: false });
    }
  };

  return (
    <div className="max-md:hidden flex flex-wrap gap-4 mt-5">
      {HomePageFilters.map((item) => {
        return (
          <Button
            key={item.value}
            onClick={() => {}}
            onClickCapture={() => handleChangeFilter(item.value)}
            variant="ghost"
            size="sm"
            className={`text-sm font-normal ${
              activeFilter === item.value
                ? "bg-primary/10 text-primary"
                : "bg-gray-100 dark:bg-gray-900"
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
