import QuestionForm from "@/components/forms/QuestionForm";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestionPage = async () => {
   const { userId } = auth();
   if (!userId) redirect("/sign-in");
   const currentUser = await getUser(userId);
   return (
      <div>
         <QuestionForm currentUserID={JSON.stringify(currentUser._id)} />
      </div>
   );
};

export default AskQuestionPage;
