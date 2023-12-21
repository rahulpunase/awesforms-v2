import { useDispatch } from "react-redux";

import { Separator } from "@/components/ui/separator";
import { ConfigEditorProps } from "@/models";
import { updateSingleLineConfig } from "@/store/slice/builder/builder.slice";
import { AppDispatch } from "@/store/store";

import BooleanConfigEditor from "./components/BooleanConfigEditor";
import CharacterLimitEditor from "./components/CharacterLimitEditor";
import InitialValueEditor from "./components/InitialValueEditor";
import InstructionEditor from "./components/InstructionEditor";
import LabelEditor from "./components/LabelEditor";
import PlaceholderEditor from "./components/PlaceholderEditor";

const SingleLineConfigEditor = ({
  config,
  tempId,
}: ConfigEditorProps<"SINGLE_LINE">) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <LabelEditor
        initialValue={config?.label}
        onInput={(value: string) =>
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                label: value,
              },
            })
          )
        }
      />
      <PlaceholderEditor
        initialValue={config?.placeholderText}
        onInput={(value: string) =>
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                placeholderText: value,
              },
            })
          )
        }
      />
      <InstructionEditor
        initialValue={config?.instruction}
        onInput={(value: string) =>
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                instruction: value,
              },
            })
          )
        }
      />
      <Separator orientation="horizontal" className="mt-6" />
      <InitialValueEditor
        fieldType={config.inputType}
        initialValue={config?.initialValue}
        onInput={(value: string) =>
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                initialValue: value,
              },
            })
          )
        }
      />
      <BooleanConfigEditor
        initialValue={config.isRequired}
        label="Required?"
        onChange={(value: boolean) => {
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                isRequired: value,
              },
            })
          );
        }}
      />
      <BooleanConfigEditor
        initialValue={config.isVisible}
        label="Visible?"
        onChange={(value: boolean) => {
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                isVisible: value,
              },
            })
          );
        }}
      />
      <BooleanConfigEditor
        initialValue={config.isDisabled}
        label="Disabled?"
        onChange={(value: boolean) => {
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                isDisabled: value,
              },
            })
          );
        }}
      />
      <Separator orientation="horizontal" className="mt-6" />
      <CharacterLimitEditor
        initialMin={config.minCharacterLimit}
        initialMax={config.maxCharacterLimit}
        onInput={(fieldType, value) => {
          dispatch(
            updateSingleLineConfig({
              tempId,
              toUpdate: {
                [fieldType]: value,
              },
            })
          );
        }}
      />
    </div>
  );
};

export default SingleLineConfigEditor;
