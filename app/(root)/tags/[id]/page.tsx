import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { Badge } from "@/components/ui/badge";
import { getQuestionsByTagId } from "@/lib/actions/tags.action";
import React from "react";

const TagDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { q: string };
}) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <Badge variant="secondary" className="text-2xl font-normal rounded-md">
        {result?.tagTitle}
      </Badge>
      <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          placeholder="Search Questions"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex flex-col gap-6 w-full">
        {result?.questions.length! > 0 ? (
          result?.questions.map((ques: any) => {
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
    </>
  );
};

export default TagDetailPage;
