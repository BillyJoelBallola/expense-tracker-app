import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Category, Wallet } from "@/generated/prisma";

type WalletOption = {
  type: "wallet";
  items: Wallet[] | null;
};

type CategoryOption = {
  type: "category";
  items: Category[] | null;
};

type SelectWithLabelProps = {
  label: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  value: string;
} & (WalletOption | CategoryOption);

function SelectWithLabel({
  label,
  placeholder,
  onValueChange,
  value,
  ...rest
}: SelectWithLabelProps) {
  const items = rest.items;

  return (
    <div className="space-y-2 w-full">
      <Label>{label}</Label>
      <Select onValueChange={onValueChange} value={value} required>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                <span
                  className={`${
                    "bankName" in item
                      ? "text-black dark:text-white"
                      : "type" in item && item.type === "INCOME"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {"bankName" in item ? item.bankName || "No Name" : item.label}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectWithLabel;
