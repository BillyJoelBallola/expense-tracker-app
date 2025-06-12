"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categoryIcon } from "@/lib/categoryIcon";
import { Category } from "@/generated/prisma";
import { useState } from "react";
import { CircleX, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  transactionData: {
    categoryId: string;
  };
  onValueChange: (value: string) => void;
  categories: Category[];
};

function RadioButtonCategory({
  transactionData,
  onValueChange,
  categories,
}: Props) {
  const [seeMore, setSeeMore] = useState(false);

  const sliceCategories = !seeMore ? categories.slice(0, 4) : categories;

  return (
    <div className="space-y-2">
      <Label>Category</Label>
      <ScrollArea
        className={`${sliceCategories.length <= 4 ? "h-auto" : "h-28"}`}
      >
        <RadioGroup
          defaultValue={transactionData.categoryId}
          onValueChange={onValueChange}
          className="flex items-center gap-2 flex-wrap"
        >
          {sliceCategories
            ?.filter((c) => c.type !== "TRANSFER")
            .map((category) => (
              <div
                key={category.id}
                className={`${
                  transactionData.categoryId === category.id &&
                  "bg-neutral-800 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900"
                } flex items-center gap-1 border p-2 rounded-full`}
              >
                <RadioGroupItem
                  value={category.id}
                  id={category.id}
                  className="hidden"
                />
                <Label htmlFor={category.id}>
                  {categoryIcon(category.label, "size-4")}
                  <span>{category.label}</span>
                </Label>
              </div>
            ))}
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSeeMore((prev) => !prev)}
            className="flex items-center gap-1 border px-2 py-1.5 text-sm font-semibold rounded-full"
          >
            {seeMore ? (
              <>
                <CircleX className="size-4" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Ellipsis className="size-4" />
                <span>More</span>
              </>
            )}
          </Button>
        </RadioGroup>
      </ScrollArea>
    </div>
  );
}

export default RadioButtonCategory;
