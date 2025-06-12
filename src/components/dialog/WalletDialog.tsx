"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Loader, Plus, PlusCircle } from "lucide-react";
import { WalletType } from "@/generated/prisma";
import InputWithLabel from "../input/InputWithLabel";
import { createNewWallet } from "@/actions/wallet.action";
import { toast } from "sonner";

const walletType = [
  {
    value: "CASH",
    label: "Cash",
  },
  {
    value: "BANK",
    label: "Bank",
  },
  {
    value: "EWALLET",
    label: "E-wallet",
  },
];

function WalletDialog() {
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [walletData, setWalletData] = useState<{
    type: WalletType;
    bankName: string;
  }>({
    type: "BANK",
    bankName: "",
  });

  const setDefaultData = () => {
    setWalletData({
      type: "BANK",
      bankName: "",
    });
  };

  const handleAddWallet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsAddingWallet(true);

    try {
      const response = await createNewWallet(walletData);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        setDefaultData();
        return toast.success("Wallet successfully created");
      }
    } catch (error) {
      return toast.error("An error occured while creating wallet");
    } finally {
      setIsAddingWallet(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer hover:bg-neutral-500/10 duration-200 ease-in-out border-2 border-dashed py-6 rounded-lg flex items-center justify-center gap-2"
          asChild
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
            <PlusCircle />
            <span>Add Wallet</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription>Add a wallet to track</DialogDescription>
        </DialogHeader>
        <form
          id="signInForm"
          onSubmit={handleAddWallet}
          className="space-y-4 sm:mb-8"
        >
          <RadioGroup
            defaultValue={walletData.type}
            onValueChange={(value) =>
              setWalletData((_) => ({
                bankName: "",
                type: value as WalletType,
              }))
            }
            className="flex justify-center sm:justify-start gap-2 flex-wrap"
          >
            {walletType.map((wallet) => (
              <div
                key={wallet.label}
                className="flex items-center gap-2 border p-2 rounded-full"
              >
                <RadioGroupItem value={wallet.value} id={wallet.value} />
                <Label htmlFor={wallet.value}>{wallet.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {walletData.type !== "CASH" && (
            <InputWithLabel
              label={walletData.type === "BANK" ? "Bank Name" : "App Name"}
              placeholder={`Input here the ${
                walletData.type === "BANK" ? "bank name" : "app name"
              }`}
              id="bankName"
              onChange={(value) =>
                setWalletData((prev) => ({
                  ...prev,
                  bankName: value as string,
                }))
              }
              value={walletData.bankName}
            />
          )}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={setDefaultData}
              disabled={isAddingWallet}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="signInForm" disabled={isAddingWallet}>
            {isAddingWallet && <Loader className="size-4 animate-spin" />} Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default WalletDialog;
