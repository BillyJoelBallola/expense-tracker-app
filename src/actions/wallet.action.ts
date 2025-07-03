"use server";

import { WalletType } from "@/generated/prisma";
import { currentUser } from "./user.action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNewWallet({
  type,
  bankName,
}: {
  type: WalletType;
  bankName: string;
}) {
  try {
    const user = await currentUser();

    if (!user) return;

    const newBankName = type === "CASH" ? "Cash" : bankName;

    const isWalletExist = await prisma.wallet.findFirst({
      where: {
        AND: [{ userId: user.id }, { type }, { bankName: newBankName }],
      },
    });

    if (isWalletExist) {
      return { error: "Wallet already exist" };
    }

    const newWallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        type,
        bankName: newBankName,
      },
    });

    revalidatePath("/wallet");
    return { success: true, newWallet };
  } catch (error) {
    console.error("Failed to create wallet:", error);
    return { success: true, error: "Failed to create wallet" };
  }
}

export async function getWalletCards() {
  try {
    const user = await currentUser();

    if (!user) return;

    const wallets = await prisma.wallet.groupBy({
      by: ["bankName", "id", "balance"],
      where: { userId: user.id },
    });

    const getTransactionInfoOfWallet = async (walletId: string) => {
      const transactions = await prisma.transaction.findMany({
        where: { walletId },
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
    };

    const formattedWallets = await Promise.all(
      wallets.map(async (wallet) => {
        const totals = await getTransactionInfoOfWallet(wallet.id);
        return { ...wallet, ...totals };
      })
    );

    return formattedWallets;
  } catch (error) {
    console.error("Failed to fetch wallet card data");
    throw new Error("Failed to fetch wallet card data");
  }
}

export async function getWallets() {
  try {
    const user = await currentUser();

    if (!user) return;

    const wallets = await prisma.wallet.findMany({
      where: {
        userId: user.id,
      },
    });

    return wallets;
  } catch (error) {
    console.error("Failed to fetch wallets");
    throw new Error("Failed to fetch wallets");
  }
}

export async function deleteWallet(walletId: string) {
  try {
    const user = await currentUser();

    if (!user) return;

    const wallet = await prisma.wallet.findFirst({
      where: { id: walletId },
      select: { userId: true },
    });

    if (!wallet) return { error: "Wallet not found" };

    if (wallet.userId !== user.id) {
      return { error: "Unauthorized - no delete permission" };
    }

    await prisma.wallet.delete({
      where: { id: walletId },
    });

    revalidatePath("/wallet");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete wallet:", error);
    return { success: false, error: "Failed to delete wallet" };
  }
}
