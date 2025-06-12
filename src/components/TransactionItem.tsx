"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeftRight,
  CalendarDays,
  Download,
  Upload,
  Wallet as WalletIcon,
} from "lucide-react";

import { format } from "date-fns";
import { Category, Transaction, Wallet } from "@/generated/prisma";
import { currencyFormat } from "@/lib/currencyFormat";
import { categoryIcon } from "@/lib/categoryIcon";

type TransactionItemProp = Transaction & {
  category: Pick<Category, "type" | "label">;
  wallet: Pick<Wallet, "bankName">;
  sourceWallet: Pick<Wallet, "bankName"> | null;
};

const TransactionItem = ({ transac }: { transac?: TransactionItemProp }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-default flex items-center justify-between p-2 bg-neutral-100 dark:bg-neutral-900/20 hover:bg-neutral-200 hover:dark:bg-neutral-900/50 duration-200 ease-in-out rounded-lg">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg shadow-sm text-neutral-800 dark:text-neutral-100 bg-neutral-300 dark:bg-neutral-800">
              {categoryIcon(transac?.category.label)}
            </div>
            <div className="grid">
              <span className="font-semibold">{transac?.category.label}</span>
              <span className="text-xs text-muted-foreground">
                {transac?.date && format(transac.date, "MMM dd, yyyy")}
              </span>
            </div>
          </div>
          <div className={`text-sm font-semibold`}>
            {transac?.category.type === "EXPENSE"
              ? "-"
              : transac?.category.type === "INCOME"
              ? "+"
              : null}{" "}
            ₱
            <span className="font-mono">
              {currencyFormat(transac?.amount!)}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
          <DialogDescription>View Transaction Information</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-6 rounded-lg py-6 bg-neutral-100 dark:bg-neutral-900/50">
            <div className="p-4 rounded-full border text-neutral-800 dark:text-neutral-100 border-neutral-800 dark:border-neutral-100">
              {transac?.category.type === "EXPENSE" ? (
                <Download className="size-6" />
              ) : transac?.category.type === "INCOME" ? (
                <Upload className="size-6" />
              ) : (
                <ArrowLeftRight />
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`rounded-full px-2 py-1 max-w-fit ${
                  transac?.category.type === "EXPENSE"
                    ? "bg-red-700"
                    : transac?.category.type === "INCOME"
                    ? "bg-green-700"
                    : "bg-neutral-700"
                }`}
              >
                <p className={`text-neutral-50 font-semibold text-xs`}>
                  {`${transac?.category.type[0]}${transac?.category.type
                    .slice(1, transac.category.type.length)
                    .toLowerCase()}`}
                </p>
              </div>
              <p className="text-2xl md:text-3xl">
                ₱
                <span className="font-mono">
                  {currencyFormat(transac?.amount!)}
                </span>
              </p>
              <div className="flex gap-1 items-center text-muted-foreground">
                <CalendarDays className="size-4" />
                <span className="text-xs">
                  {transac?.date && format(transac.date, "MMMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <span className="font-semibold">Details</span>
            <div className="space-y-2 bg-neutral-100 dark:bg-neutral-900/50 rounded-lg p-2">
              <div className="flex items-center justify-between text-sm border-b pb-2">
                <div className="flex items-center gap-2">
                  {transac?.category.type === "EXPENSE" ? (
                    <Download className="size-4" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                  <span>Amount</span>
                </div>
                <div>
                  ₱
                  <span className="font-mono">
                    {currencyFormat(transac?.amount!)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm border-b pb-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  <span>Date</span>
                </div>
                <p>{transac?.date && format(transac.date, "MMM dd, yyyy")}</p>
              </div>
              <div
                className={`flex items-center justify-between text-sm ${
                  transac?.category.type === "TRANSFER" && "border-b pb-2"
                } `}
              >
                <div className="flex items-center gap-2">
                  <WalletIcon className="size-4" />
                  <span>Source Wallet</span>
                </div>
                <p>{transac?.wallet.bankName}</p>
              </div>
              {transac?.category.type === "TRANSFER" && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <WalletIcon className="size-4" />
                    <span>Destination Wallet</span>
                  </div>
                  <p>{transac?.sourceWallet?.bankName}</p>
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <span className="font-semibold">Category</span>
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-900/50 rounded-lg">
              <div className="p-2 rounded-lg text-neutral-800 dark:text-neutral-100">
                {categoryIcon(transac?.category.label)}
              </div>
              <span className="sm:text-lg font-semibold">
                {transac?.category.label}
              </span>
            </div>
          </div>
          {transac?.note && (
            <div className="grid gap-2">
              <span className="font-semibold">Note</span>
              <div className="text-justify text-sm p-2 bg-neutral-100 dark:bg-neutral-900/50 rounded-lg">
                <p>{transac?.note}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionItem;
