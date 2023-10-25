import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

interface Props {
  imageUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles: string;
}

const Metric = ({ imageUrl, alt, value, title, textStyles }: Props) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <Image src={imageUrl} alt={alt} width={17} height={17} />
        <p className="text-xs font-semibold text-gray-500">
          {value} {""}
          <span className="font-medium">{title}</span>
        </p>
      </div>
    </>
  );
};

export default Metric;
