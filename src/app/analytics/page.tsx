import { getTotalSpendSummary } from "@/actions/transaction.actions";

import IncomeExpenseChart from "@/components/analytics/IncomeExpenseChart";
import SpendingInsights from "@/components/analytics/SpendingInsights";
import SpendSummary from "@/components/analytics/SpendSummary";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function AnalyticsPage() {
  const spendSummary = await getTotalSpendSummary();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Analytics</h1>
        <Link
          href="/analytics/transactions"
          className="hover:underline text-sm text-muted-foreground"
        >
          Transaction History
        </Link>
      </div>
      <div className="space-y-4">
        <IncomeExpenseChart />
        <SpendingInsights />
        <SpendSummary spendSummary={spendSummary} />
      </div>
    </div>
  );
}

export default AnalyticsPage;
