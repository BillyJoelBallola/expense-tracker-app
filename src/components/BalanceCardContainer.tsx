import { getWalletCards } from "@/actions/wallet.action";
import { colorCollection } from "@/lib/colorCollection";
import BalanceCard from "@/components/BalanceCard";

async function BalanceCardContainer() {
  const wallets = await getWalletCards();

  return (
    <div className="grid grid-cols-2 gap-2 my-4 md:my-8">
      {wallets && wallets?.length !== 0 ? (
        wallets?.map((item, idx) => (
          <BalanceCard
            key={item.id}
            balance={item.balance}
            income={item.income}
            expense={item.expense}
            bankName={item.bankName ?? "Wallet"}
            color={colorCollection[idx]}
          />
        ))
      ) : (
        <div>card</div>
      )}
    </div>
  );
}

export default BalanceCardContainer;
