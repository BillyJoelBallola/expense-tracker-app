"use client";

import { Dispatch, SetStateAction } from "react";

import { Category } from "@/generated/prisma";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DateInputWithLabel from "@/components/input/DateInputWithLabel";
import { Button } from "@/components/ui/button";

type CategoryType = Category["type"] | "ALL";

type Props = {
  filter: {
    type: CategoryType;
    date: Date | string;
  };
  setFilter: Dispatch<
    SetStateAction<{
      type: CategoryType;
      date: Date | string;
    }>
  >;
};

const categoryTypes = [
  { type: "ALL", label: "All" },
  { type: "EXPENSE", label: "Expense" },
  { type: "INCOME", label: "Income" },
  { type: "TRANSFER", label: "Transfer" },
];

function TransactionFilter({ filter, setFilter }: Props) {
  return (
    // <div className="flex items-start sm:items-center flex-col-reverse sm:flex-row gap-2 justify-between w-full">
    <div className="grid sm:grid-cols-[1fr_150px] gap-4 w-full">
      {/* Date Picker */}
      <div className="order-1 sm:order-2">
        <DateInputWithLabel
          btnStyle="rounded-full"
          selected={filter.date as Date}
          clearCalendar={() => setFilter((prev) => ({ ...prev, date: "" }))}
          todayCalendar={() =>
            setFilter((prev) => ({ ...prev, date: new Date() }))
          }
          onSelect={(value) => setFilter((prev) => ({ ...prev, date: value }))}
        />
      </div>

      {/* Radio Group */}
      <div className="order-2 sm:order-1">
        <RadioGroup
          defaultValue={filter.type}
          onValueChange={(value: any) =>
            setFilter((prev) => ({ ...prev, type: value as CategoryType }))
          }
          className="flex flex-wrap items-center gap-1"
        >
          {categoryTypes.map((category) => (
            <Button
              variant={category.type === filter.type ? "default" : "outline"}
              key={category.label}
              className="rounded-full overflow-hidden px-0"
            >
              <RadioGroupItem
                value={category.type}
                id={category.type}
                className="hidden"
              />
              <Label htmlFor={category.type} className="text-sm h-10 px-4">
                {category.label}
              </Label>
            </Button>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default TransactionFilter;
