import ProfileForm from "@/components/forms/ProfileForm";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const EditProfilePage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUser(userId);
  //   fetching the question details to fill the Question-form
  return (
    <>
      <h1 className="text-2xl font-semibold mb-5">Edit Profile</h1>
      <div>
        <ProfileForm clerkId={userId} user={JSON.stringify(user)} />
      </div>
    </>
  );
};

export default EditProfilePage;
