import { Input } from "@/components/ui/input";
import { FieldLayoutProps } from "@/models";

import FieldWrapper from "./FieldWrapper";

const NumberFieldLayout = ({
  config,
  selectedFieldTempId,
  tempId,
}: FieldLayoutProps<"NUMBER">) => {
  return (
    <FieldWrapper
      isRequired={config.isRequired}
      isVisible={config.isVisible}
      label={config.label}
      selectedFieldTempId={selectedFieldTempId}
      tempId={tempId}
    >
      <Input type="number" readOnly placeholder={config.placeholderText} />
      {config.instruction && (
        <div className="text-zinc-500 text-xs pt-2">{config.instruction}</div>
      )}
    </FieldWrapper>
  );
};

export default NumberFieldLayout;
