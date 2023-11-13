"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: "question" | "answer";
  itemId: string;
}

const ActionBtn = ({ type, itemId }: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  // EDIT ITEM
  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  // DELETE ITEM
  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathName });
    } else if (type === "answer") {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathName });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src={"/icons/edit.svg"}
          alt="edit"
          width={17}
          height={17}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src={"/icons/delete.svg"}
        alt="delete"
        width={17}
        height={17}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default ActionBtn;
