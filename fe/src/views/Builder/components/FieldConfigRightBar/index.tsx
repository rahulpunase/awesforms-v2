import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { KnownFieldConfig, OptionalField } from "@/models";
import { AppDispatch } from "@/store/store";

import {
  selectIsFormUpdateSaving,
  selectSelectedForm,
  selectSelectedTempId,
} from "../../store/builder/builder.selectors";
import { setSelectedTempId } from "../../store/builder/builder.slice";
import { updateFormDetails } from "../../store/builder/builder.thunk";
import AddressConfigEditor from "./AddressConfigEditor";
import SingleLineConfigEditor from "./SingleLineConfigEditor";

const FieldConfigRightBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedForm = useSelector(selectSelectedForm);
  const selectedTempId = useSelector(selectSelectedTempId);
  const isFormUpdateSaving = useSelector(selectIsFormUpdateSaving);

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
    <Sheet
      open={!!selectedTempId}
      onOpenChange={() => dispatch(setSelectedTempId(""))}
    >
      <SheetContent className="p-4">
        <SheetHeader>
          <div className="font-semibold text-xl border-b p-4 shadow-sm">
            Configure {field?.displayName}
          </div>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
  );
};

export default FieldConfigRightBar;
