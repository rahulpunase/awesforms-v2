import { Input } from "@/components/ui/input";
import { FieldLayoutProps } from "@/models";

import FieldWrapper from "./FieldWrapper";

const SingleLineFieldLayout = ({
  tempId,
  config,
  selectedFieldTempId,
}: FieldLayoutProps<"SINGLE_LINE">) => {
  return (
    <FieldWrapper
      label={config.label}
      selectedFieldTempId={selectedFieldTempId}
      tempId={tempId}
      isRequired={config.isRequired}
      isVisible={config.isVisible}
    >
      <Input
        placeholder={config.placeholderText}
        readOnly
        value={config.initialValue}
      />
      {config.instruction && (
        <div className="text-zinc-500 text-xs pt-2">{config.instruction}</div>
      )}
    </FieldWrapper>
  );
};

export default SingleLineFieldLayout;
