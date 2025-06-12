import { ChartLine, CircleUserRound, House, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getWallets } from "@/actions/wallet.action";
import { getCategories } from "@/actions/category.actions";
import TransactionSheet from "@/components/dialog/TransactionSheet";

async function MobileNavbar() {
  const wallets = await getWallets();
  const categories = await getCategories();

  return (
    <nav className="z-10 fixed bottom-5 left-1/2 -translate-x-1/2 text-neutral-50 dark:text-neutral-800 bg-neutral-950 dark:bg-neutral-100 rounded-full p-2 flex sm:hidden items-center gap-2">
      <Button variant="ghost" size="icon" className="rounded-full" asChild>
        <Link href="/">
          <House className="size-6" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full" asChild>
        <Link href="/wallet">
          <Wallet className="size-6" />
        </Link>
      </Button>

      <TransactionSheet
        wallets={wallets ?? null}
        categories={categories ?? null}
      />

      <Button variant="ghost" size="icon" className="rounded-full" asChild>
        <Link href="/analytics">
          <ChartLine className="size-6" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full" asChild>
        <Link href="/profile">
          <CircleUserRound className="size-6" />
        </Link>
      </Button>
    </nav>
  );
}

export default MobileNavbar;
