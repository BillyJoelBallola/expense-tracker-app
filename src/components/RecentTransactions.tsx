import { getRecentTransactions } from "@/actions/transaction.actions";
import TransactionItem from "@/components/TransactionItem";
import Link from "next/link";

async function RecentTransactions() {
  const recentTransactions = await getRecentTransactions();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Recent Transactions</h2>
        <Link
          href="/analytics/transactions"
          className="hover:underline text-sm text-muted-foreground"
        >
          See all
        </Link>
      </div>
      <div className="space-y-2">
        {recentTransactions?.length !== 0 ? (
          recentTransactions?.map((transac) => (
            <TransactionItem key={transac.id} transac={transac} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No transaction yet
          </p>
        )}
      </div>
    </div>
  );
}

export default RecentTransactions;
