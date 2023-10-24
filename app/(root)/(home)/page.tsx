import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Header */}
      <div className="w-full flex flex-col-reverse justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-semibold">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button size={"lg"} className="text-[16px]">
            Ask a Question
          </Button>
        </Link>
      </div>
      {/* Search and filter */}
      <div className="flex mt-11 justify-between gap-5 max-sm:flex-col sm:items-center"></div>
    </>
  );
}
