import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import EditQuestionLoading from "./loading";

const EditPost = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const currentUser = await getUser(userId);
  //   fetching the question details to fill the Question-form
  const result = await getQuestionById({ questionId: params.id });
  return (
    <>
      <Suspense fallback={<EditQuestionLoading />}>
        <h1 className="text-2xl font-semibold mb-5">Edit Question</h1>
        <div>
          <QuestionForm
            type="edit"
            currentUserID={JSON.stringify(currentUser?._id)}
            questionDetails={JSON.stringify(result)}
          />
        </div>
      </Suspense>
    </>
  );
};

export default EditPost;
