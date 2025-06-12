"use client";

import { useState } from "react";
import { ArrowRightLeft, Loader, Plus, X } from "lucide-react";
import { Category, Wallet } from "@/generated/prisma";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import TransferForm from "@/components/form/TransferForm";
import TransactionForm from "@/components/form/TransactionForm";

type Props = {
  wallets: Wallet[] | null;
  categories: Category[] | null;
};

function TransactionSheet({ wallets, categories }: Props) {
  const [isTranfer, setIsTransfer] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full bg-neutral-50 dark:bg-neutral-900 px-4 py-6 sm:px-2 sm:py-0 sm:border sm:mr-2 cursor-default"
          asChild
        >
          <div className="flex items-center gap-1">
            <Plus className="size-6 sm:size-4 text-neutral-900 dark:text-neutral-50" />
            <span className="hidden sm:block">New</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-auto">
        <SheetHeader>
          <SheetTitle>Transaction</SheetTitle>
          <SheetDescription>Add new transaction</SheetDescription>
        </SheetHeader>
        <div className="px-4 self-center sm:self-end">
          <Button
            variant="outline"
            className={`rounded-full max-w-fit cursor-default ${
              isTranfer && "px-2"
            }`}
            onClick={() => setIsTransfer((prev) => !prev)}
            asChild
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 ${
                  isTranfer ? "text-blue-500" : ""
                }`}
              >
                <ArrowRightLeft />
                <span>Transfer</span>
              </div>
              {isTranfer && (
                <div className="p-1 rounded-full border">
                  <X className="size-3" />
                </div>
              )}
            </div>
          </Button>
        </div>
        <div className="flex flex-col space-y-4 px-4">
          {isTranfer ? (
            <TransferForm
              wallets={wallets}
              setIsTransfer={setIsTransfer}
              setIsAddingTransaction={setIsAddingTransaction}
            />
          ) : (
            <TransactionForm
              wallets={wallets}
              categories={categories}
              setIsTransfer={setIsTransfer}
              setIsAddingTransaction={setIsAddingTransaction}
            />
          )}
        </div>
        <SheetFooter>
          <Button
            type="submit"
            form={`${isTranfer ? "tansferForm" : "transactionForm"}`}
            disabled={isAddingTransaction}
          >
            {isAddingTransaction && <Loader className="size-4 animate-spin" />}{" "}
            Add
          </Button>
          <SheetClose asChild>
            <Button variant="outline" disabled={isAddingTransaction}>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default TransactionSheet;
