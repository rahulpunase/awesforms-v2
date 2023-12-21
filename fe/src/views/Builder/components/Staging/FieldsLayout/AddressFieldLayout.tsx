import React from "react";

import { Input } from "@/components/ui/input";
import { AdditionalAddressInputsConfig, FieldLayoutProps } from "@/models";

import FieldWrapper from "./FieldWrapper";

const Field: React.FC<{
  field: AdditionalAddressInputsConfig;
}> = ({ field }) => {
  return (
    field.isVisible && (
      <div>
        <Input />
        <div className="text-xs text-zinc-500 mt-1">
          {field.label}
          {field.isRequired && <span className="text-rose-500">*</span>}
        </div>
      </div>
    )
  );
};

const AddressFieldLayout = ({
  selectedFieldTempId,
  tempId,
  config,
}: FieldLayoutProps<"ADDRESS">) => {
  return (
    <FieldWrapper
      isRequired={config.isRequired}
      isVisible={config.isVisible}
      label={config.label}
      selectedFieldTempId={selectedFieldTempId}
      tempId={tempId}
    >
      <div className="w-full">
        <div className="gap-y-4 flex flex-col">
          <Field field={config.inputs.street1} />
          <Field field={config.inputs.street2} />
        </div>
        <div className="mt-4 flex flex-row gap-x-4">
          <Field field={config.inputs.city} />
          <Field field={config.inputs.state} />
        </div>
        <div className="mt-4 flex flex-row gap-x-4">
          <Field field={config.inputs.postal} />
          <Field field={config.inputs.country} />
        </div>
      </div>
      {config.instruction && (
        <div className="text-zinc-500 text-xs pt-2">{config.instruction}</div>
      )}
    </FieldWrapper>
  );
};

export default AddressFieldLayout;
