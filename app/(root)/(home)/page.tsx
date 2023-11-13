import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/searchBar/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

export default async function Home() {
   const allQuestions = await getQuestions({});
   return (
      <>
         {/* Header */}
         <div className="w-full flex flex-col-reverse justify-between gap-4 sm:flex-row">
            <h1 className="text-2xl font-semibold">All Questions</h1>
            <Link
               href="/ask-question"
               className="flex justify-end max-sm:w-full"
            >
               <Button size={"lg"} className="tex8-[16px]">
                  Ask a Question
               </Button>
            </Link>
         </div>
         {/* Search and filter */}
         <div className="flex mt-8 justify-between gap-5 max-sm:flex-col sm:items-center">
            {/* Search */}
            <LocalSearch
               route="/"
               placeholder="Search Questions"
               otherClasses="flex-1"
            />
            {/* Filter-> till md screen size , filter is visible */}
            <Filter
               filters={HomePageFilters}
               otherClasses="min-w-[180px]"
               containerClasses="hidden max-md:flex"
            />
         </div>
         <HomeFilter />
         <div className="mt-10 flex flex-col gap-6 w-full">
            {allQuestions?.questions.map((ques) => {
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
            })}
         </div>
      </>
   );
}

export const dynamic = "force-dynamic";
