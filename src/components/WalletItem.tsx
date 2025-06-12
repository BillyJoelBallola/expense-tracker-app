"use client";

import { deleteWallet } from "@/actions/wallet.action";
import { Wallet } from "@/generated/prisma";
import { CreditCard, PhilippinePeso, QrCode, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteDialog from "./dialog/DeleteDialog";
import { useState } from "react";

type WalletItemProp = Wallet;

function Icon({ type }: { type: Wallet["type"] }) {
  if (type === "CASH") return <PhilippinePeso className="size-4" />;
  if (type === "BANK") return <CreditCard className="size-4" />;
  if (type === "EWALLET") return <QrCode className="size-4" />;
}

function WalletItem({ wallet }: { wallet: WalletItemProp }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteWallet = async (walletId: string) => {
    setIsDeleting(true);

    try {
      const response = await deleteWallet(walletId);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        return toast.success("Wallet deleted successfully");
      }
    } catch (error) {
      return toast.error("An error occured while deleting wallet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-lg p-2 rounded-lg flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 rounded-lg shadow-sm text-black dark:text-white bg-neutral-300 dark:bg-neutral-800">
          <Icon type={wallet.type} />
        </div>
        <span className="text-lg font-semibold">{wallet.bankName}</span>
      </div>
      <DeleteDialog
        description="Are you sure you want to delete this wallet?"
        isDeleting={isDeleting}
        handleDelete={handleDeleteWallet}
        id={wallet.id}
      />
    </div>
  );
}

export default WalletItem;
