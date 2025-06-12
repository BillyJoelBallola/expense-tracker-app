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
        AND: [{ type }, { bankName: newBankName }],
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

export async function getTotalWalletBalance() {
  try {
    const user = await currentUser();
    if (!user) return 0;

    const total = await prisma.wallet.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        balance: true,
      },
    });

    return total._sum.balance || 0;
  } catch (error) {
    console.error("Failed to calculate total wallet balance", error);
    return 0;
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
