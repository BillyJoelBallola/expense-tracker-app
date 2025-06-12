"use client";

import { useState } from "react";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Wallet } from "@/generated/prisma";

import SelectWithLabel from "@/components/input/SelectWithLabel";
import InputWithLabel from "@/components/input/InputWithLabel";
import TextareaWithLabel from "@/components/input/TextareaWithLabel";
import { createTransfer } from "@/actions/transaction.actions";
import { toast } from "sonner";

type TransferFormProps = {
  wallets: Wallet[] | null;
  setIsTransfer: (state: boolean) => void;
  setIsAddingTransaction: (state: boolean) => void;
};

function TransferForm({
  wallets,
  setIsTransfer,
  setIsAddingTransaction,
}: TransferFormProps) {
  const router = useRouter();
  const [transferData, setTransferData] = useState({
    walletId: "",
    sourceWalletId: "",
    categoryId: "",
    amount: 0,
    note: "",
    date: new Date(),
  });

  const setDefaultData = () => {
    setTransferData({
      walletId: "",
      sourceWalletId: "",
      categoryId: "",
      amount: 0,
      note: "",
      date: new Date(),
    });

    setIsTransfer(false);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsAddingTransaction(true);

    try {
      if (
        transferData.walletId === "" ||
        transferData.sourceWalletId === "" ||
        transferData.amount === 0
      ) {
        return toast.error(
          "Failed to transfer. Please fill up all important fields"
        );
      }

      const response = await createTransfer(transferData);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        setDefaultData();
        router.replace("/analytics/transactions");
        return toast.success("Transfer successfully");
      }
    } catch (error) {
      return toast.error("An error occured while transferring");
    } finally {
      setIsAddingTransaction(false);
    }
  };
  return (
    <form id="tansferForm" onSubmit={handleOnSubmit} className="space-y-4 mb-8">
      <div className="grid gap-2">
        <span className="text-sm font-semibold">Wallets</span>
        <div className="p-2 rounded-lg flex items-center gap-2 sm:gap-4 bg-neutral-100 dark:bg-neutral-900/50">
          <SelectWithLabel
            label="From"
            type="wallet"
            items={wallets ?? null}
            placeholder="Select wallet"
            onValueChange={(value) =>
              setTransferData((prev) => ({
                ...prev,
                sourceWalletId: value,
              }))
            }
            value={transferData.sourceWalletId}
          />
          <div>
            <MoveRight className="size-6" />
          </div>
          <SelectWithLabel
            label="To"
            type="wallet"
            items={wallets ?? null}
            placeholder="Select wallet"
            onValueChange={(value) =>
              setTransferData((prev) => ({
                ...prev,
                walletId: value,
              }))
            }
            value={transferData.walletId}
          />
        </div>
      </div>
      <InputWithLabel
        label="Amount"
        type="number"
        placeholder="Enter amount"
        className="w-full"
        id="amount"
        onChange={(value) =>
          setTransferData((prev) => ({
            ...prev,
            amount: value as number,
          }))
        }
        value={transferData.amount}
      />
      <TextareaWithLabel
        value={transferData.note}
        handleChange={(value) =>
          setTransferData((prev) => ({
            ...prev,
            note: value,
          }))
        }
      />
    </form>
  );
}

export default TransferForm;
