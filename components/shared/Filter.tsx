"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { createCustomURL } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: { name: string; value: string }[];
  containerClasses?: string;
  otherClasses?: string;
}

const Filter = ({ otherClasses, containerClasses, filters }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("filter");

  const handleChangeFilter = (item: string) => {
    const newUrl = createCustomURL({
      params: searchParams.toString(),
      key: "filter",
      value: item.toLowerCase(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`${containerClasses}`}>
      <Select
        onValueChange={(value) => {
          handleChangeFilter(value);
        }}
        defaultValue={query || undefined}
      >
        <SelectTrigger className={`${otherClasses}`}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="z-50">
          {filters.map((item) => {
            return (
              <SelectItem className="z-50" key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
