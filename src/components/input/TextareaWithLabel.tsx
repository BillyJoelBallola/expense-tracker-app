import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

type TextareaWithLabelProps = {
  value: string;
  handleChange: (value: string) => void;
};

function TextareaWithLabel({ value, handleChange }: TextareaWithLabelProps) {
  return (
    <div className="space-y-2">
      <Label>
        Note
        <span className="text-muted-foreground">(Optional)</span>
      </Label>
      <Textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Add details"
        className="!resize-none"
      />
    </div>
  );
}

export default TextareaWithLabel;
