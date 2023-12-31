import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { Badge } from "@/components/ui/badge";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUser } from "@/lib/actions/user.action";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import SingleQuestionLoading from "./loading";
import { Suspense } from "react";

const QuestionDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { filter: string; page: number };
}) => {
  const { userId: clerkId } = auth();
  let currentUser;
  if (clerkId) {
    currentUser = await getUser(clerkId);
  }
  const question = await getQuestionById({ questionId: params.id });

  return (
    <>
      <Suspense fallback={<SingleQuestionLoading />}>
        <div className="flex items-start w-full flex-col">
          <div className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
            <Link href={`/profile/${question.author.clerkId}`} className="flex items-center gap-1">
              <Image
                src={question.author.picture}
                alt={question.author.name}
                width={22}
                height={22}
                className="rounded-full"
              />
              <Badge variant="secondary" className="text-sm font-normal rounded-md">
                {question.author.name}
              </Badge>
            </Link>
            {/* Upvote / Downvote */}
            <Votes
              type="question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(currentUser?._id)}
              upvotes={question.upvotes?.length}
              downvotes={question.downvotes?.length}
              hasUserUpvoted={question.upvotes?.includes(currentUser?._id)}
              hasUserDownVoted={question.downvotes?.includes(currentUser?._id)}
              hasSaved={currentUser?.savedPost?.includes(question._id)}
            />
          </div>
          <h2 className="font-xl sm:text-2xl mt-3 w-full text-left">{question.title}</h2>
        </div>
        {/* Stats */}
        <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <Metric
            imageUrl="/icons/clock.svg"
            alt="Upvotes"
            value={` asked ${formatDateTime(question.createdAt)}`}
            title={""}
            textStyles="text-xs text-gray-500 "
          />
          <Metric
            imageUrl="/icons/answers.svg"
            alt="Answers"
            value={question.answers.length}
            title={"Answers"}
            textStyles="text-xs text-gray-500 "
          />
          <Metric
            imageUrl="/icons/views.svg"
            alt="Views"
            value={question.views}
            title={"Views"}
            textStyles="text-xs text-gray-500 "
          />
        </div>
        {/* Parsing MARKDOWN //! Not Mobile Responsive*/}
        <ParseHTML data={question.content} />
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {question.tags.map((tag: any) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
        {/* Partition */}
        <div className="mt-5 mb-3">
          <div className="border"></div>
        </div>
        {/* Display all answers */}
        <AllAnswers
          questionId={question._id}
          authorId={currentUser?._id}
          totalAnswers={question.answers.length}
          filter={searchParams?.filter}
          page={searchParams?.page}
        />
        {/* Answer field */}
        <AnswerForm
          question={question.content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(currentUser?._id)}
        />
      </Suspense>
    </>
  );
};

export default QuestionDetailPage;
