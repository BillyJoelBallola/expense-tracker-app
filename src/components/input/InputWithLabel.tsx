"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type InputWithLabelProps = {
  label: string;
  type?: "text" | "number" | "password";
  placeholder?: string;
  className?: string;
  showPassClassName?: string;
  id: string;
  onChange: (value: string | number) => void;
  value: string | number;
} & React.HTMLAttributes<HTMLInputElement>;

const InputWithLabel = ({
  label,
  type,
  placeholder,
  onChange,
  className,
  showPassClassName,
  id,
  value,
  ...props
}: InputWithLabelProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const resolvedType =
    type === "password" && showPassword ? "text" : (type ?? "text");

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={resolvedType}
        className={className ?? ""}
        placeholder={placeholder ?? "Enter text"}
        onChange={(e) => {
          const value = e.target.value;

          if (type === "number") {
            onChange(value === "" ? "" : Number(value));
          } else {
            onChange(value);
          }
        }}
        {...props}
        required
      />
      {type === "password" && (
        <div
          className={`flex items-center justify-end gap-1 text-muted-foreground ${showPassClassName}`}
        >
          <input
            type="checkbox"
            id="showPassword"
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="showPassword" className="text-xs">
            Show Password
          </label>
        </div>
      )}
    </div>
  );
};

export default InputWithLabel;
