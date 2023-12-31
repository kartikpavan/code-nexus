import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { Badge } from "@/components/ui/badge";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tags.action";
import Link from "next/link";
import TagsPageLoading from "./loading";
import { Suspense } from "react";

const TagsPage = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) => {
  const results = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <>
      <Suspense fallback={<TagsPageLoading />}>
        <h1 className="text-2xl font-semibold">All Tags</h1>
        {/* Search and filter */}
        <div className="flex mt-8 justify-between gap-5 max-sm:flex-col-reverse sm:items-center">
          {/* Search */}
          <LocalSearch route="/tags" placeholder="Search for other users" otherClasses="flex-1" />
          {/* Filter-> till md screen size , filter is visible */}
          <Filter filters={TagFilters} otherClasses="min-w-[180px]" containerClasses="flex" />
        </div>
        <div className="flex items-center flex-wrap gap-x-5 gap-y-10 mt-10">
          {results?.tags.length! > 0 ? (
            results?.tags.map((tag) => {
              return (
                <Link
                  href={`/tags/${tag._id}`}
                  key={tag._id}
                  className="shadow-md rounded-md border sm:max-w-[250px] w-full hover:bg-gray-100/50 dark:hover:bg-gray-900 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center flex-col text-center py-8">
                    <Badge
                      variant="secondary"
                      className="font-medium text-primary hover:border hover:border-primary"
                    >
                      {tag.name.toUpperCase()}
                    </Badge>
                    <h1 className="mt-2 w-full text-spaceGrotesk text-sm text-gray-500 my-1 font-mono">
                      <span className="text-primary">{tag.questions.length}</span>+ Questions
                    </h1>
                  </div>
                </Link>
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

export default TagsPage;
