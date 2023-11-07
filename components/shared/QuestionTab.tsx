import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "../cards/QuestionCard";

interface Props {
   searchParams: string;
   userId: string;
   clerkId: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
   const results = await getUserQuestions({ userId, page: 1 });
   return (
      <div className="flex flex-col gap-2">
         {results?.userQuestions.map((ques) => {
            return (
               <QuestionCard
                  key={ques._id}
                  _id={ques._id}
                  clerkId={clerkId}
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
   );
};

export default QuestionTab;
