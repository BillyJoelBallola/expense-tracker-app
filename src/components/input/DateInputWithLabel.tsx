import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import clsx from "clsx";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

type DateInputWithLabelProps = {
  label?: string;
  selected: Date | "";
  btnStyle?: string;
  onSelect: (selected: Date) => void;
  clearCalendar: () => void;
  todayCalendar: () => void;
};

function DateInputWithLabel({
  selected,
  onSelect,
  label,
  btnStyle,
  clearCalendar,
  todayCalendar,
}: DateInputWithLabelProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={clsx(
              "pl-3 text-left font-normal w-full",
              !selected && "text-muted-foreground",
              btnStyle
            )}
          >
            {selected ? format(selected, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected ? selected : undefined}
            onSelect={onSelect}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            captionLayout="dropdown"
            required
          />
          <div className="px-2 pb-2 flex items-center justify-between">
            <Button variant="link" onClick={clearCalendar}>
              Clear
            </Button>
            <Button variant="link" onClick={todayCalendar}>
              Today
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateInputWithLabel;
