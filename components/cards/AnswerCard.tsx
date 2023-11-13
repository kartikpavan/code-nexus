import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Metric from "../shared/Metric";
import { formatDateTime } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import ActionBtn from "../shared/ActionBtn";

interface Props {
  clerkId: string | null;
  _id: string | null;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  question,
  clerkId,
  _id,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <>
      <Card>
        <CardHeader>
          <Link href={`/question/${question?._id}/#${_id}`}>
            <CardTitle className="text-lg sm:text-xl line-clamp-2">
              {question?.title}
            </CardTitle>
          </Link>
          {/*  edit and delete btn  */}
          <SignedIn>
            {showActionButtons && (
              <ActionBtn type="answer" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </CardHeader>
        <CardFooter className="w-full flex items-start justify-between flex-col-reverse sm:flex-row gap-4">
          <Metric
            imageUrl={author?.picture}
            alt="user"
            value={author?.name}
            title={` - asked ${formatDateTime(createdAt)}`}
            textStyles="text-xs text-gray-500 "
          />
          <div className="flex items-center justify-end gap-4">
            <Metric
              imageUrl="/icons/upvotes.svg"
              alt="Upvotes"
              value={upvotes}
              title={"Upvotes"}
              textStyles="text-xs text-gray-500 "
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default AnswerCard;
