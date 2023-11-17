"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/constants/filters";
import { createCustomURL } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const [activeFilter, setActiveFilter] = useState<string>(type || "");

  const handleChangeFilter = (item: string) => {
    if (activeFilter !== item) {
      setActiveFilter(item);
      const newURL = createCustomURL({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
      router.push(newURL, { scroll: false });
    } else {
      // if same filter is clicked again then remove the query from the URL
      // and set the active filter to null or empty
      setActiveFilter("");
      const newURL = createCustomURL({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newURL, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5">
      <p>Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => {
          return (
            <Button
              key={item.value}
              variant={activeFilter === item.value ? "default" : "outline"}
              className="cursor-pointer font-medium"
              onClick={() => handleChangeFilter(item.value)}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFilters;
