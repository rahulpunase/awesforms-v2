import { Textarea } from "@/components/ui/textarea";
import { FieldLayoutProps } from "@/models";

import FieldWrapper from "./FieldWrapper";

const MultiLineFieldLayout = ({
  tempId,
  config,
  selectedFieldTempId,
}: FieldLayoutProps<"MULTI_LINE">) => {
  return (
    <FieldWrapper
      label={config.label}
      selectedFieldTempId={selectedFieldTempId}
      tempId={tempId}
      isRequired={config.isRequired}
      isVisible={config.isVisible}
    >
      <Textarea
        readOnly
        value={config.initialValue}
        placeholder={config.placeholderText}
      />
    </FieldWrapper>
  );
};

export default MultiLineFieldLayout;
