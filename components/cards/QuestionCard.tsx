import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import Metric from "../shared/Metric";

interface Props {
  _id: number | string;
  title: string;
  tags: {
    _id: number | string;
    name: string;
  }[];
  author: {
    _id: number | string;
    name: string;
    picture: string;
  };
  createdAt: Date;
  views: number;
  answers: Array<Object>;
  upvotes: number;
}

const QuestionCard = ({ _id, title, tags, author, createdAt, views, answers, upvotes }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            return (
              <Link
                key={tag._id}
                href={`/tags/${_id}`}
                className="border px-2 py-1 rounded-full text-xs font-medium text-primary hover:bg-white hover:border hover:border-primary"
              >
                {tag.name}
              </Link>
            );
          })}
        </CardDescription>
        {/* Add edit and delete btn later */}
      </CardHeader>
      <CardFooter className="w-full flex items-start justify-between flex-col-reverse sm:flex-row gap-4">
        <Metric
          imageUrl="/icons/user.svg"
          alt="user"
          value={author.name}
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
          <Metric
            imageUrl="/icons/answers.svg"
            alt="Answers"
            value={answers.length}
            title={"Answers"}
            textStyles="text-xs text-gray-500 "
          />
          <Metric
            imageUrl="/icons/views.svg"
            alt="Views"
            value={views}
            title={"Views"}
            textStyles="text-xs text-gray-500 "
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
