import { categoryIcons } from "@/lib/categoryIcons";
import { CircleHelp } from "lucide-react";

export const categoryIcon = (label: string, className?: string) => {
  const Icon = label in categoryIcons ? categoryIcons[label] : CircleHelp;

  return <Icon className={className} />;
};
