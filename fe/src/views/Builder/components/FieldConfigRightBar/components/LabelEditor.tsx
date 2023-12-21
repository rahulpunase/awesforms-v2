import { Input } from "@/components/ui/input";

const LabelEditor = ({
  initialValue,
  onInput,
}: {
  initialValue: string;
  onInput: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-1">Label</div>
      <Input value={initialValue} onInput={(ev) => onInput(ev.target.value)} />
    </div>
  );
};

export default LabelEditor;
