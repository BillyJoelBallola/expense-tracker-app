"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import YearOption from "@/components/input/YearOption";
import { useEffect, useState } from "react";
import { getIncomeExpenseComparison } from "@/actions/transaction.actions";

const chartConfig = {
  income: {
    label: "Income",
    color: "oklch(69.6% 0.17 162.48)",
  },
  expense: {
    label: "Expense",
    color: "oklch(63.7% 0.237 25.331)",
  },
} satisfies ChartConfig;

type ChardDataType = {
  month: string;
  income: number;
  expense: number;
};

function IncomeExpenseChart() {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [chartData, setChartData] = useState<ChardDataType[]>();

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await getIncomeExpenseComparison(selectedYear);
      if (!response) return;
      setChartData(response);
    };

    fetchChartData();
  }, [selectedYear]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Comparison Chart</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Income and Expense - {selectedYear}
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
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="income"
              type="monotone"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke="var(--color-expense)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default IncomeExpenseChart;
