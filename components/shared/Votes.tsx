"use client";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface Props {
   type: string;
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
   const handleVote = (type: string) => {};

   const handleSave = () => {};

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
         {/* Add to savedPost */}
         <Image
            src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-outline.svg"}
            alt="star"
            width={17}
            height={17}
            className="cursor-pointer"
            onClick={handleSave}
         />
      </div>
   );
};

export default Votes;
