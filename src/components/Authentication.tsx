"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import SigninDialog from "@/components/dialog/SigninDialog";
import SignupDialog from "@/components/dialog/SignupDialog";
import ModeToggle from "./ModeToggle";

function Authentication() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const image = !mounted
    ? "/white-logo.png"
    : theme === "dark"
      ? "/white-logo.png"
      : "/dark-logo.png";

  return (
    <div className="grid place-items-center">
      <div className="absolute top-4 right-4 md:right-4">
        <ModeToggle />
      </div>
      <div className="grid gap-4 place-items-center text-center">
        <img src={image} alt="Wallet Icon" className="mt-10 size-48" />
        <div>
          <h1 className="text-6xl sm:text-7xl font-mono font-extrabold">
            trakr
          </h1>
          <p className="font-semibold">
            Expense tracker <br />
            <small className="font-normal text-neutral-500">
              by Billy Joel
            </small>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <SigninDialog />
        <SignupDialog />
      </div>
    </div>
  );
}

export default Authentication;
