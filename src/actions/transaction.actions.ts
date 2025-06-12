"use server";

import { Transaction } from "@/generated/prisma";
import { currentUser } from "./user.action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCategoryTransfer } from "./category.actions";
import { format } from "date-fns";

type CreateTransactionProps = Pick<
  Transaction,
  "walletId" | "amount" | "date" | "categoryId" | "note"
>;

type CreateTransactionTransferProps = Pick<
  Transaction,
  "walletId" | "amount" | "date" | "categoryId" | "note" | "sourceWalletId"
>;

export async function getTransactions() {
  try {
    const user = await currentUser();

    if (!user) return;

    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: "desc",
      },
      where: {
        userId: user.id,
      },
      include: {
        category: {
          select: {
            label: true,
            type: true,
          },
        },
        wallet: {
          select: {
            bankName: true,
          },
        },
        sourceWallet: {
          select: {
            bankName: true,
          },
        },
      },
    });

    return transactions ?? [];
  } catch (error) {
    console.error("Failed to fetch transactions");
    throw new Error("Error in fetch transactions");
  }
}

export async function getRecentTransactions() {
  try {
    const user = await currentUser();

    if (!user) return;

    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: "desc",
      },
      where: {
        userId: user.id,
      },
      include: {
        category: {
          select: {
            label: true,
            type: true,
          },
        },
        wallet: {
          select: {
            bankName: true,
          },
        },
        sourceWallet: {
          select: {
            bankName: true,
          },
        },
      },
      take: 10,
    });

    return transactions ?? [];
  } catch (error) {
    console.error("Failed to fetch transactions");
    throw new Error("Error in fetch transactions");
  }
}

export async function getTotalTransactionAmounts() {
  try {
    const user = await currentUser();

    if (!user) return;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      select: {
        amount: true,
        category: {
          select: {
            type: true,
          },
        },
      },
    });

    const totals = transactions.reduce(
      (acc, txn) => {
        const type = txn.category?.type;
        if (type === "EXPENSE") {
          acc.expense += txn.amount;
        } else if (type === "INCOME") {
          acc.income += txn.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return totals;
  } catch (error) {
    console.error("Failed to get total transaction amounts");
  }
}

export async function getTotalSpendSummary() {
  try {
    const user = await currentUser();

    if (!user) return;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      select: {
        categoryId: true,
        amount: true,
        date: true,
      },
    });

    // Group by categoryId + month
    const summaryMap = new Map<
      string,
      {
        categoryId: string;
        date: string;
        total: number;
        count: number;
      }
    >();

    for (const tx of transactions) {
      const dateKey = format(tx.date, "yyyy-MM");
      const key = `${tx.categoryId}_${dateKey}`;

      if (summaryMap.has(key)) {
        const entry = summaryMap.get(key)!;
        entry.total += tx.amount;
        entry.count += 1;
      } else {
        summaryMap.set(key, {
          categoryId: tx.categoryId,
          date: dateKey,
          total: tx.amount,
          count: 1,
        });
      }
    }

    const summaryArray = Array.from(summaryMap.values());

    const results = await Promise.all(
      summaryArray.map(async (group) => {
        const category = await prisma.category.findUnique({
          where: { id: group.categoryId },
          select: { label: true, type: true },
        });

        return {
          categoryId: group.categoryId,
          label: category?.label ?? "Unknown",
          type: category?.type ?? "Unknown",
          total: group.total,
          count: group.count,
          date: group.date,
        };
      })
    );

    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch total spend summary");
  }
}

export async function getIncomeExpenseComparison(year: number) {
  try {
    const user = await currentUser();

    if (!user) return;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      include: {
        category: true,
      },
    });

    const summaryArray = [
      { month: "January", income: 0, expense: 0 },
      { month: "February", income: 0, expense: 0 },
      { month: "March", income: 0, expense: 0 },
      { month: "April", income: 0, expense: 0 },
      { month: "May", income: 0, expense: 0 },
      { month: "June", income: 0, expense: 0 },
      { month: "July", income: 0, expense: 0 },
      { month: "August", income: 0, expense: 0 },
      { month: "September", income: 0, expense: 0 },
      { month: "October", income: 0, expense: 0 },
      { month: "November", income: 0, expense: 0 },
      { month: "December", income: 0, expense: 0 },
    ];

    const transactionsFilteredByDate = transactions.filter((tx) =>
      tx.date.toString().includes(year.toString())
    );

    for (const item of transactionsFilteredByDate) {
      const month = format(item.date, "MMMM");

      if (item.category.type === "EXPENSE") {
        const summaryIdx = summaryArray.findIndex((ar) => ar.month === month);
        const summary = summaryArray[summaryIdx];
        const newSummary = {
          ...summary,
          expense: summary.expense + item.amount,
        };
        summaryArray[summaryIdx] = newSummary;
      }

      if (item.category.type === "INCOME") {
        const summaryIdx = summaryArray.findIndex((ar) => ar.month === month);
        const summary = summaryArray[summaryIdx];
        const newSummary = {
          ...summary,
          income: summary.income + item.amount,
        };
        summaryArray[summaryIdx] = newSummary;
      }
    }

    return summaryArray;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch income and expense comparison data");
  }
}

export async function getSpendingInsights(year: number) {
  try {
    const user = await currentUser();

    if (!user) return;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      include: {
        category: true,
      },
    });

    const insights = {
      expense: 0,
      income: 0,
    };

    const transactionsFilteredByDate = transactions.filter((tx) =>
      tx.date.toString().includes(year.toString())
    );

    for (const tx of transactionsFilteredByDate) {
      if (tx.category.type === "EXPENSE") {
        insights.expense += tx.amount;
      }

      if (tx.category.type === "INCOME") {
        insights.income += tx.amount;
      }
    }

    return insights;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch spending insights");
  }
}

export async function createTransaction(
  transactionData: CreateTransactionProps
) {
  try {
    let newBalance = 0;

    const user = await currentUser();

    if (!user) return;

    const category = await prisma.category.findFirst({
      where: {
        id: transactionData.categoryId,
      },
    });

    if (!category) return;
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: transactionData.walletId,
      },
    });

    if (!wallet) return;

    switch (category.type) {
      case "EXPENSE":
        if (transactionData.amount > wallet.balance) {
          return { error: "Wallet balance insufficient" };
        }
        newBalance = wallet.balance - transactionData.amount;
        break;
      case "INCOME":
        newBalance = wallet.balance + transactionData.amount;
        break;
    }

    await prisma.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        balance: newBalance,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        walletId: wallet.id,
        categoryId: category.id,
        amount: transactionData.amount,
        note: transactionData.note,
        date: transactionData.date,
      },
    });

    revalidatePath("/");
    revalidatePath("/transactions");
    return { success: true, transaction };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create transaction" };
  }
}

export async function createTransfer(
  transactionData: CreateTransactionTransferProps
) {
  try {
    const user = await currentUser();

    if (!user) return;

    const category = await getCategoryTransfer();

    if (!category) return;

    if (transactionData.walletId === transactionData.sourceWalletId) {
      return { error: "Source and destination wallets cannot be the same" };
    }

    const [sourceWallet, destinationWallet] = await Promise.all([
      prisma.wallet.findFirst({
        where: { id: transactionData.sourceWalletId! },
      }),
      prisma.wallet.findFirst({
        where: { id: transactionData.walletId! },
      }),
    ]);

    if (sourceWallet?.balance! < transactionData.amount) {
      return {
        error: "Failed to transfer. Source wallet has insuffiecient balance",
      };
    }

    // update wallet balance
    await prisma.wallet.update({
      where: {
        id: sourceWallet?.id,
      },
      data: {
        balance: sourceWallet?.balance! - transactionData.amount,
      },
    });

    await prisma.wallet.update({
      where: {
        id: destinationWallet?.id,
      },
      data: {
        balance: destinationWallet?.balance! + transactionData.amount,
      },
    });

    // create transfer transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        walletId: destinationWallet?.id!,
        sourceWalletId: sourceWallet?.id!,
        categoryId: category.id,
        amount: transactionData.amount,
        note: transactionData.note,
      },
    });

    revalidatePath("/");
    revalidatePath("/transactions");
    return { success: true, transaction };
  } catch (error) {
    console.error(error);
    return { error: "Failed to transfer" };
  }
}
