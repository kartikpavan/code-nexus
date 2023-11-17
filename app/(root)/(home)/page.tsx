import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) {
  const results = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });
  return (
    <>
      {/* Header */}
      <div className="w-full flex flex-col-reverse justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-semibold">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button size={"lg"} className="tex8-[16px]">
            Ask a Question
          </Button>
        </Link>
      </div>
      {/* Search and filter */}
      <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
        {/* Search */}
        <LocalSearch route="/" placeholder="Search Questions" otherClasses="flex-1" />
        {/* Filter-> till md screen size , filter is visible */}
        <Filter
          filters={HomePageFilters}
          otherClasses="min-w-[180px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilter />
      <div className="mt-10 flex flex-col gap-6 w-full">
        {results?.questions.length! > 0 ? (
          results?.questions.map((ques) => {
            return (
              <QuestionCard
                key={ques._id}
                _id={ques._id}
                title={ques.title}
                tags={ques.tags}
                createdAt={ques.createdAt}
                views={ques.views}
                upvotes={ques.upvotes.length}
                author={ques.author}
                answers={ques.answers}
              />
            );
          })
        ) : (
          <NoResult />
        )}
      </div>
      <div className="mt-8">
        <Pagination
          pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
          nextPageExist={results?.isNext}
        />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
