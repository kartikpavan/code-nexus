"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createCustomURL, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  route: string;
  otherClasses: string;
  placeholder: string;
}

const LocalSearch = ({ route, otherClasses, placeholder }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [searchTerm, setSearchTerm] = useState(query || "");

  useEffect(() => {
    // Custom debounce function to limit the frequency of function calls and improve performance
    const customDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const newUrl = createCustomURL({
          params: searchParams.toString(),
          key: "q",
          value: searchTerm,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(customDebounceFn);
  }, [searchTerm, route, pathName, router, searchParams, query]);

  return (
    <div className="w-full">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder={placeholder}
        className={`${otherClasses}`}
      />
    </div>
  );
};

export default LocalSearch;
