import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import { getSavedPosts } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function CollectionPage() {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedPosts({ clerkId: userId });
  return (
    <>
      {/* Header */}
      <h1 className="text-2xl font-semibold">Saved Questions</h1>
      {/* Search and filter */}
      <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
        {/* Search */}
        <LocalSearch route="/" placeholder="Search Questions" otherClasses="flex-1" />
        {/* Filter-> till md screen size , filter is visible */}
        <Filter filters={QuestionFilters} otherClasses="min-w-[180px]" />
      </div>
      <div className="mt-10 flex flex-col gap-6 w-full">
        {result?.questions.length! > 0
          ? result?.questions.map((ques: any) => {
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
          : "No Result"}
      </div>
    </>
  );
}
