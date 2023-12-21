import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputType } from "@/models";

const InitialValueEditor = ({
  initialValue,
  onInput,
  fieldType,
}: {
  initialValue: string;
  onInput: (value: string) => void;
  fieldType: InputType;
}) => {
  return (
    <div className="flex flex-col  mt-6">
      <div className="mb-1">Initial Value</div>
      {fieldType === "textarea" && (
        <Textarea
          value={initialValue}
          onInput={(ev) => onInput(ev.target.value)}
        />
      )}
      {fieldType === "text" && (
        <Input
          type={fieldType}
          value={initialValue}
          onInput={(ev) => onInput(ev.target.value)}
        />
      )}
    </div>
  );
};

export default InitialValueEditor;
