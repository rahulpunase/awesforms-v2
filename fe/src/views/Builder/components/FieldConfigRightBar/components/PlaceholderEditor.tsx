import { Input } from "@/components/ui/input";

const PlaceholderEditor = ({
  initialValue,
  onInput,
}: {
  initialValue: string;
  onInput: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col mt-6">
      <div className="mb-1">Placeholder Text</div>
      <Input value={initialValue} onInput={(ev) => onInput(ev.target.value)} />
    </div>
  );
};

export default PlaceholderEditor;
