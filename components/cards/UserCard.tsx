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
      className=" shadow-md rounded-md border max-w-[200px] w-full hover:scale-105 transition-transform duration-200"
    >
      <div className="flex items-center justify-center flex-col text-center py-8">
        <Image src={user.picture} alt={user.name} width={80} height={80} className="rounded-full" />
        <h1 className="text-md font-semibold mt-2">{user.name}</h1>
        <h1 className="w-full text-spaceGrotesk  text-gray-500 my-1">@{user.username}</h1>
      </div>
    </Link>
  );
};

export default UserCard;
