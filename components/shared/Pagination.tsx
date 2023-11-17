"use client";
import { createCustomURL } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  nextPageExist: boolean | undefined;
}

type NavigationType = "next" | "prev";

const Pagination = ({ pageNumber, nextPageExist }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePagination = (action: NavigationType) => {
    const nextPageNumber = action === "next" ? pageNumber + 1 : pageNumber - 1;
    const newURL = createCustomURL({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newURL);
  };

  if (!nextPageExist && pageNumber === 1) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="secondary"
        disabled={pageNumber === 1}
        onClick={() => handlePagination("prev")}
      >
        Prev
      </Button>
      <div className="flex items-center justify-center p-2">
        <p className="font-normal text-primary">{pageNumber}</p>
      </div>
      <Button
        variant="secondary"
        disabled={!nextPageExist}
        onClick={() => handlePagination("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
