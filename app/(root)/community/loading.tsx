import { Skeleton } from "@/components/ui/skeleton";
const CommunityPageLoading = () => {
  return (
    <section>
      <div className="flex mt-8 w-full justify-between gap-5 max-sm:flex-col-reverse sm:items-center">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-full sm:w-28 " />
      </div>
      <div className="flex flex-wrap gap-5 mt-10">
        {Array.from({ length: 5 }, (_, idx) => (
          <div key={idx} className="sm:max-w-[250px] w-full">
            <Skeleton className="h-14 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityPageLoading;
