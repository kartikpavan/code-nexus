import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const QuestionDetailPage = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex items-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={`/profile/${question.author.clerkId}`} className="flex items-center gap-1">
            <Image
              src={question.author.picture}
              alt={question.author.name}
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="font-mono text-sm">{question.author.name}</p>
          </Link>
          {/* Voting */}
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="text-xl mt-3 w-full text-left">{question.title}</h2>
      </div>
      {/* Metrics */}
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
      {/* Parse MARKDOWN */}
      <div>
        <ParseHTML data={question.content} />
      </div>
    </>
  );
};

export default QuestionDetailPage;
