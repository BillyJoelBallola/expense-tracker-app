"use client";

import { getTransactions } from "@/actions/transaction.actions";
import TransactionItem from "@/components/TransactionItem";
import { Category } from "@/generated/prisma";
import { useEffect, useMemo, useState } from "react";
import TransactionFilter from "./TransactionFilter";

type TransactionType = Awaited<ReturnType<typeof getTransactions>>;

function TransactionsPage() {
  const [filter, setFilter] = useState<{
    type: Category["type"] | "ALL";
    date: Date | string;
  }>({
    type: "ALL",
    date: "",
  });
  const [transactions, setTransactions] = useState<TransactionType | null>(
    null
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactions();
      if (!response) return;
      setTransactions(response);
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions?.filter((tx) => {
      const matchDate = filter.date
        ? new Date(tx.date).toDateString() ===
          new Date(filter.date).toDateString()
        : true;

      const matchCategoryType =
        filter.type !== "ALL" ? tx.category.type === filter.type : true;

      return matchDate && matchCategoryType;
    });
  }, [filter, transactions]);

  return (
    <div className="space-y-4">
      {/* TODO: Graph and Filtering */}
      <div className="flex items-center">
        <TransactionFilter filter={filter} setFilter={setFilter} />
      </div>

      {/* data */}
      <h1 className="font-semibold">Transactions</h1>
      <div className="space-y-2">
        {filteredTransactions?.length !== 0 ? (
          filteredTransactions?.map((transac) => (
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

export default TransactionsPage;
