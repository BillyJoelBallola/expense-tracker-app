import BalanceCard from "@/components/BalanceCard";
import RecentTransactions from "@/components/RecentTransactions";

async function Home() {
  return (
    <div className="grid gap-4">
      <div className="grid place-items-center my-4 md:my-8">
        <BalanceCard />
      </div>
      <RecentTransactions />
    </div>
  );
}

export default Home;
