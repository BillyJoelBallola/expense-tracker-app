import BalanceCard from "./BalanceCard";
import BalanceCardSkeleton from "./BalanceCardSkeleton";

import { getWalletCards } from "@/actions/wallet.action";
import { colorCollection } from "@/lib/colorCollection";

async function BalanceCardContainer() {
  const wallets = await getWalletCards();

  if (!wallets) {
    return (
      <div className="grid place-items-center my-4 md:my-8">
        <BalanceCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-40 md:h-48 my-4 md:my-8">
      <BalanceCard wallets={wallets!!} colors={colorCollection} />
    </div>
  );
}

export default BalanceCardContainer;
