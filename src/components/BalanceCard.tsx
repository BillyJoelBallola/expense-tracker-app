"use client";

import { useEffect, useState } from "react";
import { currencyFormat } from "@/lib/currencyFormat";
import { Wallet } from "@/generated/prisma";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getTotalTransactionAmounts } from "@/actions/transaction.actions";
import { getTotalWalletBalance, getWallets } from "@/actions/wallet.action";

function BalanceCard() {
  const [selectedWallet, setSelectedWallet] = useState("total");
  const [overallTotalBalance, setOverallTotalBalance] = useState(0);
  const [totalTransactionAmounts, setTotalTransactionAmounts] = useState({
    income: 0,
    expense: 0,
  });
  const [wallets, setWallets] = useState<Wallet[]>();
  const [total, setTotal] = useState({
    overallTotalBalance: 0,
    balance: 0,
    income: 0,
    exponse: 0,
  });

  useEffect(() => {
    const fetchWallets = async () => {
      const walletResponse = await getWallets();
      setWallets(walletResponse);
    };

    const fetchTotalBallance = async () => {
      const totalBalanceResponse = await getTotalWalletBalance();
      setOverallTotalBalance(totalBalanceResponse);
      setTotal((prev) => ({
        ...prev,
        balance: totalBalanceResponse,
      }));
    };

    const fetchTransactionAmounts = async () => {
      const totalAmountsResponse = await getTotalTransactionAmounts();
      setTotalTransactionAmounts({
        income: totalAmountsResponse?.income ?? 0,
        expense: totalAmountsResponse?.expense ?? 0,
      });
    };

    fetchTransactionAmounts();
    fetchTotalBallance();
    fetchWallets();
  }, []);

  const handleSelect = (value: string) => {
    setSelectedWallet(value);

    if (value === "total") {
      setTotal((prev) => ({
        ...prev,
        balance: overallTotalBalance,
      }));
      return;
    }

    const findWalletBalance =
      wallets?.length !== 0
        ? (wallets?.find((item) => item.id === value)?.balance as number)
        : 0;

    setTotal((prev) => ({
      ...prev,
      balance: findWalletBalance,
    }));
  };

  return (
    <div className="relative overflow-hidden bg-neutral-800 text-white w-full md:w-sm h-48 rounded-lg shadow-xl">
      {/* design */}
      <div className="absolute -top-15 -right-15 size-40 rounded-full grid place-items-center bg-gradient-to-tr from-neutral-600 via-transparent to-neutral-50">
        <div className="size-20 bg-neutral-800 rounded-full" />
      </div>

      <div className="absolute -bottom-10 -left-5 size-32 rounded-full bg-gradient-to-tr from-neutral-900 via-transparent to-neutral-600" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div>
          <Select
            value={selectedWallet}
            defaultValue={selectedWallet}
            onValueChange={handleSelect}
          >
            <SelectTrigger className="!bg-transparent !border-0 !p-0 !shadow-none">
              <SelectValue placeholder="Total balance" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Wallet</SelectLabel>
                <SelectItem value="total">Total balance</SelectItem>
                {wallets?.length !== 0
                  ? wallets?.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.bankName}
                      </SelectItem>
                    ))
                  : null}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-2xl font-semibold">
            ₱<span className="font-mono">{currencyFormat(total.balance)}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div>
              <span className="text-sm">Income</span>
              <p className="sm:text-lg font-semibold">
                ₱
                <span className="font-mono">
                  {currencyFormat(totalTransactionAmounts.income)}
                </span>
              </p>
            </div>
          </div>
          <div>
            <span className="text-sm">Expenses</span>
            <p className="sm:text-lg font-semibold">
              ₱
              <span className="font-mono">
                {currencyFormat(totalTransactionAmounts.expense)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
