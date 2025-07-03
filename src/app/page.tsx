import BalanceCardContainer from "@/components/BalanceCardContainer";
import RecentTransactions from "@/components/RecentTransactions";

async function Home() {
  return (
    <div className="grid gap-4">
      <BalanceCardContainer />
      <RecentTransactions />
    </div>
  );
}

export default Home;
