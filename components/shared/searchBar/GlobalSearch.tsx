"use client";
import { createCustomURL, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CommandCenter from "./CommandCenter";

const GlobalSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const query = searchParams.get("q");
  const [searchTerm, setSearchTerm] = useState<string>(query || "");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const customDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const newURL = createCustomURL({
          params: searchParams.toString(),
          key: "global",
          value: searchTerm,
        });
        router.push(newURL, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(customDebounceFn);
  }, [searchTerm, pathName, router, searchParams, query]);

  return (
    <div className="max-w-5xl w-full xl:mr-36">
      <div className="hidden sm:flex items-center gap-2 px-3 py-2 border rounded-md">
        <div className="hidden sm:flex">
          <Image src="/icons/search.svg" alt="search" height={23} width={23} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isMenuOpen) setIsMenuOpen(true);
            if (e.target.value === "" && isMenuOpen) {
              setIsMenuOpen(false);
            }
          }}
          className="w-full max-w-4xl bg-transparent focus:border-none focus:outline-none placeholder:text-sm"
          placeholder="Search anything globally.."
        />
      </div>
      {isMenuOpen && <CommandCenter />}
    </div>
  );
};

export default GlobalSearch;
