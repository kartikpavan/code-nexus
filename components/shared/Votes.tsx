"use client";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { downvoteQuestion, upvoteQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { savePost } from "@/lib/actions/user.action";
import { useEffect } from "react";
import { viewFunction } from "@/lib/actions/interaction.action";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();

  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId)
      return toast({
        title: "Please Log In",
        description: "You must be logged-in to perform this action",
        variant: "destructive",
      });
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
      // Toast Notification
      return toast({
        title: `Upvote ${hasUserUpvoted ? "Removed" : "Successfull"}`,
        variant: !hasUserUpvoted ? "default" : "destructive",
      });
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
      return toast({
        title: `Downvote ${hasUserDownVoted ? "Removed" : "Successfull"}`,
        variant: !hasUserDownVoted ? "default" : "destructive",
      });
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

  useEffect(() => {
    viewFunction({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathName, router]);

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
            src={hasUserDownVoted ? "/icons/downvote-filled.svg" : "/icons/downvote-outline.svg"}
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
