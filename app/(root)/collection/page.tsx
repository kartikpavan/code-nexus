import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import { getSavedPosts } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) {
  const { userId } = auth();
  if (!userId) return null;
  const results = await getSavedPosts({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });
  return (
    <>
      {/* Header */}
      <h1 className="text-2xl font-semibold">Saved Questions</h1>
      {/* Search and filter */}
      <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
        {/* Search */}
        <LocalSearch route="/collection" placeholder="Search Questions" otherClasses="flex-1" />
        {/* Filter-> till md screen size , filter is visible */}
        <Filter filters={QuestionFilters} otherClasses="min-w-[180px]" />
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
    </>
  );
}
