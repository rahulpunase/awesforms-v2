import { Textarea } from "@/components/ui/textarea";

const InstructionEditor = ({
  initialValue,
  onInput,
}: {
  initialValue: string;
  onInput: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col  mt-6">
      <div className="mb-1">Instructions</div>
      <Textarea
        value={initialValue}
        onInput={(ev) => onInput(ev.target.value)}
      />
    </div>
  );
};

export default InstructionEditor;
