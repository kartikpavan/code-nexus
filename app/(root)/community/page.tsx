import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import CommunityPageLoading from "./loading";
import { Suspense } from "react";

const CommunityPage = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) => {
  const results = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <>
      <h1 className="text-2xl font-semibold">All Users</h1>
      <Suspense fallback={<CommunityPageLoading />}>
        {/* Search and filter */}
        <div className="flex mt-8 justify-between gap-5 max-sm:flex-col-reverse sm:items-center">
          <LocalSearch
            route="/community"
            placeholder="Search for other users"
            otherClasses="flex-1"
          />
          <Filter filters={UserFilters} otherClasses="min-w-[180px]" containerClasses="flex" />
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-5 mt-10">
          {results?.users.length! > 0 ? (
            results?.users.map((user) => {
              return <UserCard key={user._id} user={user} />;
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

export default CommunityPage;
