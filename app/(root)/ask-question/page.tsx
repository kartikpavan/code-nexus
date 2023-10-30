import QuestionForm from "@/components/forms/QuestionForm";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestionPage = async () => {
  // const { userId } = auth();

  const userId = "12345";
  if (!userId) redirect("/sign-in");

  const currentUser = await getUser(userId);
  console.log(currentUser);

  return (
    <div>
      <QuestionForm currentUserID={JSON.stringify(currentUser._id)} />
    </div>
  );
};

export default AskQuestionPage;
