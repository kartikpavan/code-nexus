import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { Badge } from "@/components/ui/badge";
import { UserFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tags.action";
import Link from "next/link";

const TagsPage = async () => {
  const results = await getAllTags({});
  return (
    <>
      <h1 className="text-2xl font-semibold">All Tags</h1>

      {/* Search and filter */}
      <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
        {/* Search */}
        <LocalSearch route="/" placeholder="Search for other users" otherClasses="flex-1" />
        {/* Filter-> till md screen size , filter is visible */}
        <Filter
          filters={UserFilters}
          otherClasses="min-w-[180px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <div className="flex items-center flex-wrap gap-x-5 gap-y-10 mt-10">
        {results?.tags.map((tag) => {
          return (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className=" shadow-md rounded-md border max-w-[200px] w-full hover:bg-blue-100/20 dark:hover:bg-blue-900/20 transition-colors duration-200"
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
        })}
      </div>
    </>
  );
};

export default TagsPage;
