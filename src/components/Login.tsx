"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LoginDialog from "@/components/dialog/LoginDialog";

function Login() {
  const { theme } = useTheme();
  const [image, setImage] = useState("/white-logo.png");

  useEffect(() => {
    setImage(theme === "dark" ? "/white-logo.png" : "/dark-logo.png");
  }, []);

  return (
    <div className="grid place-items-center">
      <div className="grid gap-4 place-items-center text-center">
        <img src={image} alt="Wallet Icon" className="mt-10 size-48" />
        <div>
          <h1 className="text-6xl sm:text-7xl font-mono font-extrabold">
            trakr
          </h1>
          <p className="font-semibold">Expense tracker</p>
        </div>
      </div>
      <LoginDialog />
    </div>
  );
}

export default Login;
