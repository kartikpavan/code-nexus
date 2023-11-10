import Link from "next/link";
import Image from "next/image";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
  };
}

const UserCard = ({ user }: Props) => {
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-md rounded-md border sm:max-w-[250px] w-full hover:bg-gray-100/50 dark:hover:bg-gray-900 transition-colors duration-200"
    >
      <div className="flex gap-2 p-2 w-full">
        <Image
          src={user.picture}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full object-cover"
        />

        <div>
          <h1 className="text-xs sm:text-sm font-semibold mt-2">{user.name}</h1>
          <h1 className="w-full text-xs sm:text-sm text-gray-500 my-1">@{user.username}</h1>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
