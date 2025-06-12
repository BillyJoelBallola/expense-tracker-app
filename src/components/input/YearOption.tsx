import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  currentYear: number;
  value: string;
  startYear: number;
  onValueChange: (value: string) => void;
};

function YearOption({ currentYear, value, onValueChange, startYear }: Props) {
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  return (
    <Select
      defaultValue={value}
      onValueChange={(value) => onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Years</SelectLabel>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default YearOption;
