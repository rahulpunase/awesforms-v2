import { Input } from "@/components/ui/input";

type CharacterLimitEditorProps = {
  initialMin: number;
  initialMax: number;
  onInput: (type: string, value: number) => void;
};
const CharacterLimitEditor = ({
  initialMin,
  initialMax,
  onInput,
}: CharacterLimitEditorProps) => {
  return (
    <div className="flex flex-col  mt-6">
      <div className="mb-1">Character Limit</div>
      <div className="flex flex-row gap-x-2">
        <div>
          <Input
            type="number"
            value={initialMin}
            onInput={(ev) => onInput("minCharacterLimit", +ev.target.value)}
          />
          <div className="">Min</div>
        </div>
        <div>
          <Input
            type="number"
            value={initialMax}
            onInput={(ev) => onInput("maxCharacterLimit", +ev.target.value)}
          />
          <div className="">Max</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterLimitEditor;
