import { Input } from "@/components/ui/input";
import { FieldLayoutProps } from "@/models";

import FieldWrapper from "./FieldWrapper";

const NameFieldLayout = ({
  config,
  selectedFieldTempId,
  tempId,
}: FieldLayoutProps<"NAME">) => {
  return (
    <FieldWrapper
      isRequired={true}
      isVisible={config.isVisible}
      label={config.label}
      selectedFieldTempId={selectedFieldTempId}
      tempId={tempId}
    >
      <div className="flex flex-row gap-x-4">
        <div>
          <Input placeholder={config.inputs.firstName?.inputType} />
          <div className="text-xs text-zinc-500 mt-2">
            {config.inputs.firstName?.label}
          </div>
        </div>
        <div>
          <Input />
          <div className="text-xs text-zinc-500 mt-2">
            {config.inputs.lastName?.label}
          </div>
        </div>
      </div>
    </FieldWrapper>
  );
};

export default NameFieldLayout;
