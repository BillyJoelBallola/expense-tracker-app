import { currentUser } from "@/actions/user.action";
import { redirect } from "next/navigation";
import SignInDialog from "./dialog/SigninDialog";
import SignUpDialog from "./dialog/SignupDialog";
import {
  Wallet,
  TrendingUp,
  List,
  PieChart,
  Package,
  Clock,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
} from "lucide-react";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";

const features = [
  {
    icon: Wallet,
    label: "Wallet overview",
    desc: "See balance, income, and expenses at a glance.",
    bg: "bg-green-100 dark:bg-green-950",
    color: "text-green-400",
  },
  {
    icon: TrendingUp,
    label: "Comparison chart",
    desc: "Visualize income vs expenses over the year.",
    bg: "bg-indigo-100 dark:bg-indigo-950",
    color: "text-indigo-400",
  },
  {
    icon: List,
    label: "Transaction history",
    desc: "Browse all your transactions with filters.",
    bg: "bg-amber-100 dark:bg-amber-950",
    color: "text-amber-400",
  },
  {
    icon: PieChart,
    label: "Spend insights",
    desc: "Monthly breakdown of your spending habits.",
    bg: "bg-red-100 dark:bg-red-950",
    color: "text-red-400",
  },
];

const transactions = [
  {
    icon: Package,
    label: "Parcel",
    date: "Jun 02, 2026",
    amount: "259",
    type: "expense",
  },
  {
    icon: Banknote,
    label: "Allowance",
    date: "Jun 02, 2026",
    amount: "500",
    type: "income",
  },
  {
    icon: Clock,
    label: "Part Time",
    date: "Jun 01, 2026",
    amount: "5,000",
    type: "income",
  },
];

export default async function LandingPage() {
  const user = await currentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 w-full bg-neutral-50 dark:bg-neutral-900 border-b px-6 py-2 flex items-center justify-between">
        <h1 className="text-lg font-semibold font-mono text-neutral-500">
          Trakr
        </h1>
        <div className="flex items-center gap-2">
          <SignInDialog />
          <SignUpDialog />
          <ModeToggle />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        {/* Hero */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 text-green-600 dark:text-green-400 text-xs font-medium px-3 py-1.5 rounded-full font-mono">
            <Wallet className="size-3" />
            Personal finance tracker
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Track every peso.{" "}
            <span className="font-mono text-green-600 dark:text-green-400">
              Know your numbers.
            </span>
          </h1>
          <p className="text-neutral-500 text-base max-w-md mx-auto leading-relaxed">
            Trakr is a clean, fast expense and income tracker. See your wallet
            balance, recent transactions, and spending insights — all in one
            place.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="size-4" />
              See how it works
            </Button>
          </div>
        </div>

        {/* App Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left — Dashboard card */}
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-5 space-y-5 border">
            {/* Wallet selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-1.5 text-sm font-mono text-neutral-500">
                Gcash
                <svg className="size-2" viewBox="0 0 12 12" fill="currentColor">
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="flex gap-1">
                {[0, 0, 0].map((_, i) => (
                  <div key={i} className="size-1 rounded-full bg-neutral-500" />
                ))}
              </div>
            </div>

            {/* Balance */}
            <p className="text-4xl font-semibold">
              ₱<span className="font-mono">241</span>
            </p>

            {/* Income / Expense */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3">
                <p className="text-xs text-neutral-500 mb-1">Income</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  ₱<span className="font-mono">500</span>
                </p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3">
                <p className="text-xs text-neutral-500 mb-1">Expenses</p>
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                  ₱<span className="font-mono">259</span>
                </p>
              </div>
            </div>

            {/* Recent transactions */}
            <div>
              <div className="flex items-center justify-between mb-3 text-neutral-500">
                <p className="text-xs uppercase tracking-wide font-mono">
                  Recent Transactions
                </p>
                <span className="text-xs font-mono cursor-pointer">
                  See all
                </span>
              </div>
              <div className="divide-y devide-neutral-100 dark:divide-neutral-800">
                {transactions.map((tx) => (
                  <div key={tx.label} className="flex items-center gap-3 py-3">
                    <div className="size-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                      <tx.icon className="size-4 text-neutral-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono">{tx.label}</p>
                      <p className="text-xs text-neutral-500">{tx.date}</p>
                    </div>
                    <span
                      className={`text-sm shrink-0 ${
                        tx.type === "income"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {tx.type === "expense" ? "-" : "+"} ₱
                      <span className="font-mono">{tx.amount}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Analytics card */}
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-5 space-y-4 border">
            {/* Header */}
            <div>
              <p className="text-xs text-neutral-500 font-mono">Analytics</p>
              <p className="text-base font-semibold font-mono">
                Comparison Chart
              </p>
              <p className="text-xs text-neutral-600">
                Income and Expense — 2026
              </p>
            </div>

            {/* Chart */}
            <div className="bg-neutral-100 dark:bg-neutral-950 rounded-xl p-3 h-24 relative overflow-hidden">
              <svg
                viewBox="0 0 260 60"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <polyline
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                  points="0,55 30,52 60,48 90,45 120,8 150,50 180,53 210,54 240,55 260,55"
                />
                <polyline
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                  points="0,57 30,56 60,55 90,54 120,52 150,53 180,55 210,56 240,57 260,57"
                />
              </svg>
              <div className="absolute bottom-2 left-3 right-3 flex justify-between">
                {["Feb", "May", "Jun", "Sep", "Dec"].map((m) => (
                  <span
                    key={m}
                    className="text-[10px] text-neutral-700 font-mono"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Spending Insights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-200 dark:bg-green-950 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 dark:text-green-400 mb-1 font-mono">
                    Income
                  </p>
                  <p className="text-base font-semibold">
                    ₱<span className="font-mono">5,500</span>
                  </p>
                </div>
                <div className="size-7 rounded-lg bg-green-400 flex items-center justify-center">
                  <ArrowUpRight className="size-4 text-green-950" />
                </div>
              </div>
              <div className="bg-red-200 dark:bg-red-950 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-600 dark:text-red-400 mb-1 font-mono">
                    Expense
                  </p>
                  <p className="text-base font-semibold">
                    ₱<span className="font-mono">259</span>
                  </p>
                </div>
                <div className="size-7 rounded-lg bg-red-400 flex items-center justify-center">
                  <ArrowDownLeft className="size-4 text-red-950" />
                </div>
              </div>
            </div>

            {/* Spend Summary */}
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3">
              <p className="text-xs text-neutral-500 font-mono mb-3">
                Spend Summary — 2026-06
              </p>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  <Clock className="size-4 text-neutral-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-mono">Part Time</p>
                  <p className="text-xs text-neutral-500">1 Transactions</p>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">
                  + ₱<span className="font-mono">5,000</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(({ icon: Icon, label, desc, bg, color }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-4 rounded-xl border bg-neutral-100 dark:bg-neutral-900"
            >
              <div
                className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${bg}`}
              >
                <Icon className={`size-4 ${color}`} />
              </div>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-10 px-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border space-y-4">
          <p className="text-xs text-green-600 dark:text-green-400 font-mono tracking-widest uppercase">
            Free to use
          </p>
          <p className="text-2xl font-semibold font-mono">
            Start tracking today.
          </p>
          <p className="text-sm text-neutral-500">
            No credit card required. No limits.
          </p>
          <SignUpDialog />
        </div>

        <p className="text-center text-xs text-neutral-600 font-mono">
          Design & Built by Billy Joel © {new Date().getFullYear()} Trakbord.
          All rights reserved.
        </p>
      </div>
    </div>
  );
}
