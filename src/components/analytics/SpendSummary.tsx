"use client";

import { useMemo, useState } from "react";

import { currencyFormat } from "@/lib/currencyFormat";
import { categoryIcon } from "@/lib/categoryIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

type SpendSummaryProps = {
  spendSummary: {
    categoryId: string;
    label: string;
    type: string;
    total: number;
    count: number;
    date: string;
  }[];
};

function SpendSummary({ spendSummary }: SpendSummaryProps) {
  const currentMonthYear = format(new Date(), "yyyy-MM");
  const [date, setDate] = useState(currentMonthYear);

  const filteredSummary = useMemo(() => {
    return spendSummary.filter((item) => item.date.toString().includes(date));
  }, [date]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Spend Summary</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Summary - {format(new Date(date), "MMM, yyyy")}
          </CardDescription>
        </div>
        <Input
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-fit text-sm"
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 rounded-md space-y-2">
          {spendSummary.length !== 0 ? (
            filteredSummary.map((spend) => (
              <div
                key={spend.categoryId}
                className="cursor-default flex items-center justify-between py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg shadow-sm text-neutral-800 dark:text-neutral-100 bg-neutral-300 dark:bg-neutral-800">
                    {categoryIcon(spend.label)}
                  </div>
                  <div className="grid">
                    <span className="font-semibold">{spend.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {spend.count} Transactions
                    </span>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {spend.type === "EXPENSE"
                    ? "-"
                    : spend.type === "INCOME"
                    ? "+"
                    : null}{" "}
                  ₱
                  <span className="font-mono">
                    {currencyFormat(spend.total)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No data yet.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default SpendSummary;
