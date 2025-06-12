import { getTotalSpendSummary } from "@/actions/transaction.actions";

import IncomeExpenseChart from "@/components/analytics/IncomeExpenseChart";
import SpendingInsights from "@/components/analytics/SpendingInsights";
import SpendSummary from "@/components/analytics/SpendSummary";

async function AnalyticsPage() {
  const spendSummary = await getTotalSpendSummary();

  return (
    <div className="space-y-4">
      <IncomeExpenseChart />
      <SpendingInsights />
      <SpendSummary spendSummary={spendSummary} />
    </div>
  );
}

export default AnalyticsPage;
