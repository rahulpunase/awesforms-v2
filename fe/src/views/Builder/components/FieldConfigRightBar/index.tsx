import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KnownFieldConfig, OptionalField } from "@/models";
import { setSelectedTempId } from "@/store/slice/builder/builder.slice";
import { updateFormDetails } from "@/store/slice/builder/builder.thunk";
import { AppDispatch, RootState } from "@/store/store";

import AddressConfigEditor from "./AddressConfigEditor";
import SingleLineConfigEditor from "./SingleLineConfigEditor";

const FieldConfigRightBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedForm, selectedTempId, isFormUpdateSaving } = useSelector(
    (store: RootState) => store.builder
  );

  const selectedPage = selectedForm?.pages?.find((page) => page.isSelected);

  const field = selectedPage?.fields?.find(
    (field) => field.tempId === selectedTempId
  ) as OptionalField;

  const renderConfigType = () => {
    if (field?.type === "SINGLE_LINE") {
      return (
        <SingleLineConfigEditor
          config={field.config as KnownFieldConfig<"SINGLE_LINE">}
          tempId={field.tempId}
        />
      );
    }

    if (field?.type === "MULTI_LINE") {
      return (
        <SingleLineConfigEditor
          config={field.config as KnownFieldConfig<"MULTI_LINE">}
          tempId={field.tempId}
        />
      );
    }

    if (field?.type === "ADDRESS") {
      return (
        <AddressConfigEditor
          config={field.config as KnownFieldConfig<"ADDRESS">}
          tempId={field.tempId}
        />
      );
    }
    return null;
  };

  const saveFormClickHandler = () => {
    if (!selectedForm?.pages) {
      return;
    }
    dispatch(
      updateFormDetails({
        formId: selectedForm.id,
        pages: selectedForm.pages,
      })
    );
  };

  return (
    <div className="bg-zinc-100 border-l right-0  border-zinc-500 h-full top-0 w-[380px] shrink-0 fixed">
      <div className="mt-[82px] h-full flex flex-col">
        <div className="font-semibold text-xl border-b pb-2 mb-2 p-4">
          Configure {field?.displayName}
        </div>
        <ScrollArea className="flex-grow mb-[64px]">
          {renderConfigType()}
        </ScrollArea>

        {selectedTempId && (
          <div className="absolute bottom-0 bg-zinc-50 w-full left-0 flex items-center p-3 gap-x-4 z-10">
            <Button
              variant="secondary"
              onClick={() => dispatch(setSelectedTempId(""))}
            >
              Cancel
            </Button>
            <Button
              disabled={isFormUpdateSaving}
              onClick={saveFormClickHandler}
            >
              {isFormUpdateSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldConfigRightBar;
