"use client";

import { useState } from "react";
import { currencyFormat } from "@/lib/currencyFormat";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

type Wallet = {
  income: number;
  expense: number;
  id: string;
  balance: number;
  bankName: string | null;
};

type Color = {
  name: string;
  bgColor: string;
  symbolOne: string;
  symbolTwo: string;
};

type Props = {
  wallets: Wallet[];
  colors: Color[];
  style?: React.CSSProperties;
};

function BalanceCard({ wallets, colors, style }: Props) {
  const [selectedWallet, setSelectedWallet] = useState<Wallet>(wallets[0]);
  const [currentColor, setCurrentColor] = useState<Color>(colors[0]);

  if (!wallets) return null;

  function handleWalletChange(id: string) {
    const wallet = wallets?.find((w) => w.id === id);
    setSelectedWallet(wallet!!);
  }

  function handleColorChange(color: string) {
    const selectedColor = colors.find((c: Color) => c.bgColor === color);
    if (selectedColor) {
      setCurrentColor(selectedColor);
    }
  }

  return (
    <div
      style={style}
      className={`size-full relative md:w-1/2 overflow-hidden text-white rounded-lg shadow-xl transition-all duration-300 ease-out ${currentColor.bgColor}`}
    >
      <div
        className={`absolute -top-15 -right-15 size-40 rounded-full grid place-items-center ${currentColor.symbolOne}`}
      >
        <div className={`size-20 ${currentColor.bgColor} rounded-full`} />
      </div>

      <div
        className={`absolute -bottom-10 -left-5 size-32 rounded-full ${currentColor.symbolTwo}`}
      />

      {/* content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <div>
            <Select
              onValueChange={handleWalletChange}
              defaultValue={wallets[0].id}
            >
              <SelectTrigger className="w-28 border-none font-semibold">
                <SelectValue placeholder="Wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Wallets</SelectLabel>
                  {wallets?.map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.bankName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-lg md:text-2xl font-semibold">
              ₱
              <span className="font-mono">
                {currencyFormat(selectedWallet.balance)}
              </span>
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Colors</DropdownMenuLabel>
                {colors.map((color) => (
                  <DropdownMenuItem
                    onSelect={() => handleColorChange(color.bgColor)}
                    key={color.name}
                  >
                    {color.name}
                    <DropdownMenuShortcut>
                      <div className={`size-2 rounded-full ${color.bgColor}`} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div>
              <span className="text-xs md:text-sm">Income</span>
              <p className="text-sm md:text-lg font-semibold">
                ₱
                <span className="font-mono">
                  {currencyFormat(selectedWallet.income)}
                </span>
              </p>
            </div>
          </div>
          <div>
            <span className="text-xs md:text-sm">Expenses</span>
            <p className="text-sm md:text-lg font-semibold">
              ₱
              <span className="font-mono">
                {currencyFormat(selectedWallet.expense)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
