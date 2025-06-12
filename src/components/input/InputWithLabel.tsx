import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps = {
  label: string;
  type?: "text" | "number" | "password";
  placeholder?: string;
  className?: string;
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
  id,
  ...props
}: InputWithLabelProps) => {
  const handleShowPasssword = (isCheck: boolean) => {
    const inputElement = document.getElementById(
      "password"
    ) as HTMLInputElement;

    if (!inputElement) return;

    if (type === "password" && isCheck) {
      inputElement.type = "text";
    } else {
      inputElement.type = "password";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type ?? "text"}
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
      {label === "Password" && (
        <div className="flex items-center justify-end gap-1 text-muted-foreground">
          <input
            type="checkbox"
            id="showPassword"
            onChange={(e) => handleShowPasssword(e.target.checked)}
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
