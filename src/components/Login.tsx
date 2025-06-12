"use client";

import Image from "next/image";
import WhiteLogo from "@/../public/white-logo.png";
import DarkLogo from "@/../public/dark-logo.png";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LoginDialog from "@/components/dialog/LoginDialog";

function Login() {
  const { theme } = useTheme();
  const [image, setImage] = useState(WhiteLogo);

  useEffect(() => {
    setImage(theme === "dark" ? WhiteLogo : DarkLogo);
  }, []);

  return (
    <div className="grid place-items-center">
      <div className="grid gap-4 place-items-center text-center">
        <Image
          src={image}
          alt="Wallet Icon"
          width={200}
          height={200}
          className="mt-10"
        />
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
