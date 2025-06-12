"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currencyFormat } from "@/lib/currencyFormat";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import YearOption from "@/components/input/YearOption";
import { getSpendingInsights } from "@/actions/transaction.actions";

type SpendingInsightType = { expense: number; income: number };

function SpendingInsights() {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [spendingInsights, setSpendingInsights] = useState<SpendingInsightType>(
    {
      expense: 0,
      income: 0,
    }
  );

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await getSpendingInsights(selectedYear);
      if (!response) return;
      setSpendingInsights(response);
    };

    fetchChartData();
  }, [selectedYear]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Spending Insights</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Insights - {selectedYear}
          </CardDescription>
        </div>
        <YearOption
          currentYear={currentYear}
          value={selectedYear.toString()}
          startYear={startYear}
          onValueChange={(value) => {
            setSelectedYear(parseInt(value));
          }}
        />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg">
          <div>
            <span className="text-xs text-muted-foreground">Income</span>
            <p className="md:text-xl">
              ₱
              <span className="font-mono font-semibold">
                {currencyFormat(spendingInsights.income)}
              </span>
            </p>
          </div>
          <div className="bg-green-500/20 p-2 rounded-lg">
            <ArrowUpRight className="text-green-500" />
          </div>
        </div>
        <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg">
          <div>
            <span className="text-xs text-muted-foreground">Expense</span>
            <p className="md:text-xl">
              ₱
              <span className="font-mono font-semibold">
                {currencyFormat(spendingInsights.expense)}
              </span>
            </p>
          </div>
          <div className="bg-red-500/20 p-2 rounded-lg">
            <ArrowDownLeft className="text-red-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SpendingInsights;
