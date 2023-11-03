import ProfileLink from "@/components/shared/ProfileLink";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInformation } from "@/lib/actions/user.action";
import { formatDateToCustomFormat } from "@/lib/utils";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const UserProfileDetailPage = async ({ params }: { params: { id: string } }) => {
   const { userId: clerkId } = auth();
   const userInfo = await getUserInformation({ userId: params.id });
   return (
      <>
         <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
            <div className="flex flex-col items-start gap-4 lg:flex-row">
               <Image
                  src={userInfo?.user.picture}
                  alt={"Profile Pic"}
                  width={140}
                  height={140}
                  className="rounded-full object-cover"
               />
               <div className="mt-3">
                  <h2 className="font-bold text-lg">{userInfo?.user.name}</h2>
                  <p className="font-mono text-sm">@{userInfo?.user.username}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                     {/* Portfolio website */}
                     {userInfo?.user.portfolioWebsite && (
                        <ProfileLink
                           imageUrl={"/icons/link.svg"}
                           title={userInfo.user.portfolioWebsite}
                        />
                     )}
                     {/* Location */}
                     {userInfo?.user.location && (
                        <ProfileLink
                           imageUrl={"/icons/location.svg"}
                           title={userInfo.user.location}
                        />
                     )}
                     {/* Joined At */}
                     <ProfileLink
                        imageUrl={"/icons/calendar.svg"}
                        title={formatDateToCustomFormat(userInfo?.user.joinedAt)}
                     />
                  </div>
                  {/* Bio */}
                  {userInfo?.user.bio && <p className="text-sm">USER BIO</p>}
               </div>
            </div>
            {/* Edit Profile BTN */}
            <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
               <SignedIn>
                  {clerkId === userInfo?.user.clerkId && (
                     <Link href="/profile/edit">
                        <Button variant="secondary">Edit Profile</Button>
                     </Link>
                  )}
               </SignedIn>
            </div>
         </div>
         {/* Stats */}
         <div className="mt-5">Stats</div>
         {/* Top Posts or Top Answers */}
         <div className="mt-10 flex gap-10">
            <Tabs defaultValue="top-posts" className="w-[400px]">
               <TabsList>
                  <TabsTrigger value="top-posts">Top Posts</TabsTrigger>
                  <TabsTrigger value="answers">Answers</TabsTrigger>
               </TabsList>
               <TabsContent value="top-posts">POSTS</TabsContent>
               <TabsContent value="answers">ANSWERS</TabsContent>
            </Tabs>
         </div>
      </>
   );
};

export default UserProfileDetailPage;