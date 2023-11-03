"use client";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { downvoteQuestion, upvoteQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { savePost } from "@/lib/actions/user.action";

interface Props {
   type: "question" | "answer";
   itemId: string;
   userId: string;
   upvotes: number;
   downvotes: number;
   hasUserUpvoted: boolean;
   hasUserDownVoted: boolean;
   hasSaved?: boolean;
}

const Votes = ({
   type,
   userId,
   itemId,
   upvotes,
   downvotes,
   hasSaved,
   hasUserDownVoted,
   hasUserUpvoted,
}: Props) => {
   const pathName = usePathname();
   const router = useRouter();

   const handleVote = async (action: "upvote" | "downvote") => {
      // UPVOTE
      if (action === "upvote") {
         if (type === "question") {
            // Server Action function
            await upvoteQuestion({
               questionId: JSON.parse(itemId),
               userId: JSON.parse(userId),
               hasupVoted: hasUserUpvoted,
               hasdownVoted: hasUserDownVoted,
               path: pathName,
            });
         } else if (type === "answer") {
            // Server Action function
            await upvoteAnswer({
               answerId: JSON.parse(itemId),
               userId: JSON.parse(userId),
               hasupVoted: hasUserUpvoted,
               hasdownVoted: hasUserDownVoted,
               path: pathName,
            });
         }
         // TODO : Toast Notification
         return;
      }
      // DOWNVOTE
      if (action === "downvote") {
         if (type === "question") {
            // Server Action function
            await downvoteQuestion({
               questionId: JSON.parse(itemId),
               userId: JSON.parse(userId),
               hasupVoted: hasUserUpvoted,
               hasdownVoted: hasUserDownVoted,
               path: pathName,
            });
         } else if (type === "answer") {
            // Server Action function
            await downvoteAnswer({
               answerId: JSON.parse(itemId),
               userId: JSON.parse(userId),
               hasupVoted: hasUserUpvoted,
               hasdownVoted: hasUserDownVoted,
               path: pathName,
            });
         }
         // TODO : Toast Notification
         return;
      }
   };

   // Save Post
   const handleSave = async () => {
      await savePost({
         userId: JSON.parse(userId),
         questionId: JSON.parse(itemId),
         path: pathName,
      });
   };

   return (
      <div className="flex gap-3">
         <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-1">
               <Image
                  src={hasUserUpvoted ? "/icons/upvote-filled.svg" : "/icons/upvote-outline.svg"}
                  alt="vote"
                  width={17}
                  height={17}
                  className="cursor-pointer"
                  onClick={() => handleVote("upvote")}
               />

               <Badge variant="secondary" className="rounded-sm font-medium">
                  {upvotes}
               </Badge>
            </div>
            <div className="flex items-center justify-center gap-1">
               <Image
                  src={
                     hasUserDownVoted ? "/icons/downvote-filled.svg" : "/icons/downvote-outline.svg"
                  }
                  alt="vote"
                  width={17}
                  height={17}
                  className="cursor-pointer"
                  onClick={() => handleVote("downvote")}
               />

               <Badge variant="secondary" className="rounded-sm font-medium">
                  {downvotes}
               </Badge>
            </div>
         </div>
         {/* SavedPost ICON*/}
         {type === "question" && (
            <Image
               src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-outline.svg"}
               alt="star"
               width={17}
               height={17}
               className="cursor-pointer"
               onClick={handleSave}
            />
         )}
      </div>
   );
};

export default Votes;
