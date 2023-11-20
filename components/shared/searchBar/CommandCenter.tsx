"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import SearchFilters from "./SearchFilters";
import { globalSearch } from "@/lib/actions/global.action";
import parse from "html-react-parser";

const CommandCenter = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState([]);

  const type = searchParams.get("type");
  const global = searchParams.get("global");

  useEffect(() => {
    const fetchResults = async () => {
      setResults([]);
      setIsLoading(true);
      try {
        // Search Everywhere , everything inside DB
        const res = await globalSearch({ query: global, typeOfSearch: type?.toLowerCase() });
        setResults(JSON.parse(res!));
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResults();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="p-5 max-w-5xl w-[70%] absolute top-full z-10 bg-secondary rounded-lg">
      <div>
        <SearchFilters />
      </div>
      {/* Partition */}
      <div className="mt-5 mb-3">
        <div className="border dark:border-gray-200/10 "></div>
      </div>
      <div>
        <p className="font-medium">Top Match</p>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <IoReload className="text-primary my-2 h-6 w-6 animate-spin" />
            <p className="text-sm">Browsing the Entire Database</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-3">
            {results?.length > 0 ? (
              results?.map((item: any, idx: number) => {
                return (
                  <Link
                    key={item.type + item.id + idx}
                    href={renderLink(item.type, item.id)}
                    className="flex w-full cursor-pointer gap-2 px-5 py-2 dark:hover:bg-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
                  >
                    <Image
                      src="/icons/tag.svg"
                      alt="icon"
                      width={17}
                      height={17}
                      className="object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="line-clamp-1">{parse(item.title)}</p>
                      <p className="text-sm text-gray-500 font-semibold">{item.type}</p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex flex-col px-5 items-center justify-center">
                <p>Oops! No Results found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCenter;
