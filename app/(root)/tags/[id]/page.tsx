import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { Badge } from "@/components/ui/badge";
import { getQuestionsByTagId } from "@/lib/actions/tags.action";
import React, { Suspense } from "react";
import SingleTagLoading from "./loading";

const TagDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { q: string; page: string };
}) => {
  const results = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams?.page ? Number(searchParams.page) : 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <Suspense fallback={<SingleTagLoading />}>
        <Badge variant="secondary" className="text-2xl font-normal rounded-md">
          {results?.tagTitle}
        </Badge>
        <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route={`/tags/${params.id}`}
            placeholder="Search Questions"
            otherClasses="flex-1"
          />
        </div>
        <div className="mt-10 flex flex-col gap-6 w-full">
          {results?.questions.length! > 0 ? (
            results?.questions.map((ques: any) => {
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
      </Suspense>
    </>
  );
};

export default TagDetailPage;
