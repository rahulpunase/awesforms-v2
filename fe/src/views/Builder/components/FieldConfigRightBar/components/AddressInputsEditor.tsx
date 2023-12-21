import { EyeIcon, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  AdditionalAddressInputsConfig,
  AdditionalAddressInputsKeys,
  KnownFieldConfig,
} from "@/models";
import { updateAddressInputElements } from "@/store/slice/builder/builder.slice";

const FieldEditor = ({
  field,
  tempId,
  firstLevel,
}: {
  field: AdditionalAddressInputsConfig;
  tempId: string;
  firstLevel: AdditionalAddressInputsKeys;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-center gap-x-2 mt-2">
      <button
        onClick={() => {
          dispatch(
            updateAddressInputElements({
              tempId,
              firstLevel,
              property: "isVisible",
              value: !field.isVisible,
            })
          );
        }}
      >
        {field.isVisible ? (
          <EyeIcon className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
      </button>
      <Input
        value={field.label}
        onInput={(ev) => {
          dispatch(
            updateAddressInputElements({
              tempId,
              firstLevel,
              property: "label",
              value: ev.target.value,
            })
          );
        }}
      />
      <div className="cursor-pointer">
        <Checkbox
          checked={field.isRequired}
          defaultChecked={field.isRequired}
          onClick={() => {
            dispatch(
              updateAddressInputElements({
                tempId,
                firstLevel,
                property: "isRequired",
                value: !field.isRequired,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

const AddressInputsEditor = ({
  config,
  tempId,
}: {
  config: KnownFieldConfig<"ADDRESS">;
  tempId: string;
}) => {
  return (
    <div className="mt-6">
      <div>Address Elements</div>
      <FieldEditor
        field={config.inputs.street1}
        firstLevel="street1"
        tempId={tempId}
      />
      <FieldEditor
        field={config.inputs.street2}
        firstLevel="street2"
        tempId={tempId}
      />
      <FieldEditor
        field={config.inputs.city}
        firstLevel="city"
        tempId={tempId}
      />
      <FieldEditor
        field={config.inputs.state}
        firstLevel="state"
        tempId={tempId}
      />
      <FieldEditor
        field={config.inputs.postal}
        firstLevel="postal"
        tempId={tempId}
      />
      <FieldEditor
        field={config.inputs.country}
        firstLevel="country"
        tempId={tempId}
      />
    </div>
  );
};

export default AddressInputsEditor;
