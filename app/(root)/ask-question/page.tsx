import QuestionForm from "@/components/forms/QuestionForm";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import AskQuestionLoading from "./loading";

const AskQuestionPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const currentUser = await getUser(userId);
  return (
    <>
      <Suspense fallback={<AskQuestionLoading />}>
        <h1 className="text-2xl font-semibold mb-5">Ask Question</h1>
        <QuestionForm type="create" currentUserID={JSON.stringify(currentUser?._id)} />
      </Suspense>
    </>
  );
};

export default AskQuestionPage;
