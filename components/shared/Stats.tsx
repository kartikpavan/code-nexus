import Image from "next/image";

interface Props {
   totalQuestions: number | undefined;
   totalAnswers: number | undefined;
}

const Stats = ({ totalAnswers, totalQuestions }: Props) => {
   return (
      <>
         <h3 className="text-lg font-semibold">Stats</h3>
         <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            <div className="border flex items-center justify-evenly p-6 flex-wrap rounded-md shadow-md">
               <div>
                  <p className="font-semibold">{totalQuestions}</p>
                  <p className="font-light">Questions</p>
               </div>
               <div>
                  <p className="font-semibold">{totalAnswers}</p>
                  <p className="font-light">Answers</p>
               </div>
            </div>
            <StatsCard imageUrl={"/icons/gold-medal.svg"} value={0} title={"Gold Awards"} />
            <StatsCard imageUrl={"/icons/silver-medal.svg"} value={0} title={"Silver Awards"} />
            <StatsCard imageUrl={"/icons/bronze-medal.svg"} value={0} title={"Bronze Awards"} />
         </div>
      </>
   );
};

const StatsCard = ({
   imageUrl,
   value,
   title,
}: {
   imageUrl: string;
   value: number;
   title: string;
}) => {
   return (
      <div className="border flex items-center justify-evenly p-6 flex-wrap rounded-md shadow-md">
         <Image src={imageUrl} alt={title} width={40} height={40} />
         <div className="">
            <p>{value}</p>
            <p>{title}</p>
         </div>
      </div>
   );
};

export default Stats;
