import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";

const CommunityPage = async () => {
   const results = await getAllUsers({});
   return (
      <>
         <h1 className="text-2xl font-semibold">All Users</h1>
         {/* Search and filter */}
         <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
            <LocalSearch route="/" placeholder="Search for other users" otherClasses="flex-1" />
            <Filter
               filters={UserFilters}
               otherClasses="min-w-[180px]"
               containerClasses="hidden max-md:flex"
            />
         </div>
         {/* Tags */}
         <div className="flex flex-wrap gap-5 mt-10">
            {results?.users.map((user) => {
               return <UserCard key={user._id} user={user} />;
            })}
         </div>
      </>
   );
};

export default CommunityPage;
