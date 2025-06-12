"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DateInputWithLabel from "@/components/input/DateInputWithLabel";
import InputWithLabel from "@/components/input/InputWithLabel";
import SelectWithLabel from "@/components/input/SelectWithLabel";
import TextareaWithLabel from "@/components/input/TextareaWithLabel";
import { Category, Wallet } from "@/generated/prisma";
import { createTransaction } from "@/actions/transaction.actions";
import RadioButtonCategory from "@/components/input/RadioButtonCategory";

type TransactionFormProps = {
  wallets: Wallet[] | null;
  categories: Category[] | null;
  setIsTransfer: (state: boolean) => void;
  setIsAddingTransaction: (state: boolean) => void;
};

function TransactionForm({
  wallets,
  categories,
  setIsTransfer,
  setIsAddingTransaction,
}: TransactionFormProps) {
  const router = useRouter();
  const [transactionData, setTransactionData] = useState({
    walletId: "",
    categoryId: "",
    amount: 0,
    note: "",
    date: new Date(),
  });

  const setDefaultData = () => {
    setTransactionData({
      walletId: "",
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
        transactionData.walletId === "" ||
        transactionData.categoryId === "" ||
        transactionData.amount === 0
      ) {
        return toast.error(
          "Failed to add transaction. Please fill up all important fields"
        );
      }

      const response = await createTransaction(transactionData);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        setDefaultData();
        router.replace("/analytics/transactions");
        return toast.success("Transaction successfully added");
      }
    } catch (error) {
      return toast.error("An error occured while adding transaction");
    } finally {
      setIsAddingTransaction(false);
    }
  };

  return (
    <form
      id="transactionForm"
      onSubmit={handleOnSubmit}
      className="space-y-4 mb-8"
    >
      <div className="grid gap-2 md:gap-4">
        <SelectWithLabel
          label="Wallet"
          type="wallet"
          items={wallets ?? null}
          placeholder="Select wallet"
          onValueChange={(value) =>
            setTransactionData((prev) => ({
              ...prev,
              walletId: value,
            }))
          }
          value={transactionData.walletId}
        />
        <RadioButtonCategory
          categories={categories!}
          transactionData={transactionData}
          onValueChange={(value) => {
            setTransactionData((prev) => ({
              ...prev,
              categoryId: value,
            }));
          }}
        />
      </div>
      <InputWithLabel
        label="Amount"
        type="number"
        placeholder="Enter amount"
        className="w-full"
        id="amount"
        onChange={(value) =>
          setTransactionData((prev) => ({
            ...prev,
            amount: value as number,
          }))
        }
        value={transactionData.amount}
      />
      <DateInputWithLabel
        label="Date"
        selected={transactionData.date}
        clearCalendar={() =>
          setTransactionData((prev) => ({
            ...prev,
            date: new Date(),
          }))
        }
        todayCalendar={() =>
          setTransactionData((prev) => ({
            ...prev,
            date: new Date(),
          }))
        }
        onSelect={(date) =>
          setTransactionData((prev) => ({
            ...prev,
            date: date,
          }))
        }
      />
      <TextareaWithLabel
        value={transactionData.note}
        handleChange={(value) =>
          setTransactionData((prev) => ({
            ...prev,
            note: value,
          }))
        }
      />
    </form>
  );
}

export default TransactionForm;
