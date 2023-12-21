import { useDispatch } from "react-redux";

import { Separator } from "@/components/ui/separator";
import { ConfigEditorProps } from "@/models";
import { updateAddressConfig } from "@/store/slice/builder/builder.slice";
import { AppDispatch } from "@/store/store";

import AddressInputsEditor from "./components/AddressInputsEditor";
import InstructionEditor from "./components/InstructionEditor";
import LabelEditor from "./components/LabelEditor";

const AddressConfigEditor = ({
  config,
  tempId,
}: ConfigEditorProps<"ADDRESS">) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <LabelEditor
        initialValue={config?.label}
        onInput={(value: string) =>
          dispatch(
            updateAddressConfig({
              tempId,
              toUpdate: {
                label: value,
              },
            })
          )
        }
      />
      <InstructionEditor
        initialValue={config?.instruction}
        onInput={(value: string) =>
          dispatch(
            updateAddressConfig({
              tempId,
              toUpdate: {
                instruction: value,
              },
            })
          )
        }
      />
      <Separator orientation="horizontal" className="mt-6" />
      <AddressInputsEditor
        config={config}
        tempId={tempId}
        updateAddressConfig={updateAddressConfig}
      />
    </div>
  );
};

export default AddressConfigEditor;
