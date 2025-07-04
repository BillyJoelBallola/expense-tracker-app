import BalanceCard from "@/components/BalanceCard";
import BalanceCardSkeleton from "./BalanceCardSkeleton";

import { getWalletCards } from "@/actions/wallet.action";
import { colorCollection } from "@/lib/colorCollection";

async function BalanceCardContainer() {
  const wallets = await getWalletCards();

  if (wallets && wallets?.length <= 0) {
    return (
      <div className="grid place-items-center my-4 md:my-8">
        <BalanceCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-4 my-4 md:my-8">
      {wallets?.map((item, idx) => (
        <BalanceCard
          key={item.id}
          balance={item.balance}
          income={item.income}
          expense={item.expense}
          bankName={item.bankName ?? "Wallet"}
          color={colorCollection[idx]}
        />
      ))}
    </div>
  );
}

export default BalanceCardContainer;
