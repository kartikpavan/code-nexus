import Image from "next/image";
import Link from "next/link";

const ProfileLink = ({
  imageUrl,
  title,
  href,
}: {
  imageUrl: string;
  title: string;
  href?: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image src={imageUrl} alt="icon" width={20} height={20} />
      {href ? (
        <Link href={href} target="_blank" className="text-blue-400">
          {title}
        </Link>
      ) : (
        <p className="text-sm">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
