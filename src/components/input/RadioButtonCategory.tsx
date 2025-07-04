"use client";

import { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleX, Ellipsis } from "lucide-react";

import { categoryIcon } from "@/lib/categoryIcon";
import { Category } from "@/generated/prisma";

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
              <button
                key={category.id}
                type="button"
                className={`${
                  category.type === "INCOME"
                    ? "hover:text-green-500"
                    : "hover:text-red-500"
                } ${
                  transactionData.categoryId === category.id
                    ? "text-neutral-50 dark:text-neutral-950 bg-neutral-950 dark:bg-neutral-50"
                    : "border"
                }  px-4 py-2 rounded-full`}
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
              </button>
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
