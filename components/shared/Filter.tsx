import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

interface Props {
  filters: { name: string; value: string }[];
  containerClasses?: string;
  otherClasses?: string;
}

const Filter = ({ otherClasses, containerClasses, filters }: Props) => {
  return (
    <div className={`${containerClasses}`}>
      <Select>
        <SelectTrigger className={`${otherClasses}`}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => {
              return (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
