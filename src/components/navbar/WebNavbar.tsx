import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import TransactionDialog from "@/components/dialog/TransactionDialog";
import TransactionSheet from "@/components/dialog/TransactionSheet";

import { ChartLine, CircleUserRound, House, Wallet } from "lucide-react";
import Link from "next/link";

import { getWallets } from "@/actions/wallet.action";
import { getCategories } from "@/actions/category.actions";

async function WebNavbar() {
  const wallets = await getWallets();
  const categories = await getCategories();

  return (
    <div className="hidden sm:flex items-center">
      <Button variant="ghost" asChild>
        <Link href="/">
          <House className="size-4" />
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/wallet">
          <Wallet className="size-4" />
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/analytics">
          <ChartLine className="size-4" />
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/profile">
          <CircleUserRound className="size-4" />
        </Link>
      </Button>

      {/* <TransactionDialog
        wallets={wallets ?? null}
        categories={categories ?? null}
      /> */}

      <TransactionSheet
        wallets={wallets ?? null}
        categories={categories ?? null}
      />

      <ModeToggle />
    </div>
  );
}

export default WebNavbar;
