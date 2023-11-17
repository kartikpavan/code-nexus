import { getAnswers } from "@/lib/actions/answer.action";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  authorId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({ questionId, authorId, totalAnswers, page, filter }: Props) => {
  const results = await getAnswers({ questionId, page: page ? Number(page) : 1, filter: filter });

  return (
    <>
      <div className="my-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm">
            <span className="text-primary">{totalAnswers}</span> Answers
          </h3>
          <Filter filters={AnswerFilters} />
        </div>
        {/* Answers */}
        <div>
          {results?.answers.map((ans) => {
            return (
              <article key={ans._id} className="border-b py-10">
                <div className="flex items-center justify-between">
                  <div className="flex mb-6 w-full justify-between items-center">
                    {/* User Info */}
                    <Link
                      href={`/profile/${ans.author.clerkId}`}
                      className="flex flex-1 gap-1 items-start sm:items-center hover:underline"
                    >
                      <Image
                        src={ans.author.picture}
                        alt="author"
                        width={18}
                        height={18}
                        className="rounded-full object-cover max-sm:mt-0.5"
                      />
                      <div className="flex flex-col sm:gap-2 items-start sm:flex-row sm:items-center">
                        <p className="text-sm">{ans.author.name} </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {formatDateTime(ans.createdAt)}
                        </p>
                      </div>
                    </Link>
                    <div>
                      <Votes
                        type="answer"
                        itemId={JSON.stringify(ans._id)}
                        userId={JSON.stringify(authorId)}
                        upvotes={ans.upvotes?.length}
                        downvotes={ans.downvotes?.length}
                        hasUserUpvoted={ans.upvotes?.includes(authorId)}
                        hasUserDownVoted={ans.downvotes?.includes(authorId)}
                      />
                    </div>
                  </div>
                </div>
                <ParseHTML data={ans.content} />
              </article>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <Pagination pageNumber={page ? Number(page) : 1} nextPageExist={results?.isNext} />
      </div>
    </>
  );
};

export default AllAnswers;
