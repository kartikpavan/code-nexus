import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  _id: number | string;
  name: string;
  totalQuestions: number;
}

const RenderTag = ({ _id, name, totalQuestions }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex items-center justify-between">
      <Badge
        variant="secondary"
        className="px-4 py-2 font-medium hover:bg-white hover:border hover:border-primary"
      >
        {name}
      </Badge>
      {totalQuestions}
    </Link>
  );
};

export default RenderTag;
