import { getWallets } from "@/actions/wallet.action";
import WalletDialog from "@/components/dialog/WalletDialog";
import WalletItem from "@/components/WalletItem";

async function WalletPage() {
  const wallets = await getWallets();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Wallet</h1>
      </div>
      <div className="space-y-2">
        <WalletDialog />
        {wallets?.length !== 0 ? (
          wallets?.map((wallet) => (
            <WalletItem key={wallet.id} wallet={wallet} />
          ))
        ) : (
          <p className="text-center">No wallet yet.</p>
        )}
      </div>
    </div>
  );
}

export default WalletPage;
