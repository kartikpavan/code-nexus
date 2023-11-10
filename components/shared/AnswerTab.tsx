import { GetUserAnswers } from "@/lib/actions/user.action";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface Props {
  searchParams: string;
  userId: string;
  clerkId: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await GetUserAnswers({ userId, page: 1 });
  return (
    <>
      {results?.userAnswers.map((ans) => {
        return (
          <AnswerCard
            key={ans._id}
            _id={ans._id}
            clerkId={clerkId}
            question={ans.question}
            author={ans.author}
            upvotes={ans.upvotes.length}
            createdAt={ans.createdAt}
          />
        );
      })}
    </>
  );
};

export default AnswerTab;
