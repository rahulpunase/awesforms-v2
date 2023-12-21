import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import { DraggableAndDroppableItems } from "@/models";
import { addFieldToSelectedForm } from "@/store/slice/builder/builder.slice";
import { AppDispatch, RootState } from "@/store/store";

import { defaultFieldData } from "../MetaFields/metaFieldData";
import MetaFieldsDroppableContainer from "./MetaFieldsDroppableContainer";

const StatingArea = () => {
  const { selectedForm, isLoading, selectedTempId } = useSelector(
    (store: RootState) => store.builder
  );

  const dispatch = useDispatch<AppDispatch>();

  const [collectedProps, dropRef] = useDrop(() => ({
    accept: "meta-fields",
    drop: (item: DraggableAndDroppableItems) => {
      const fieldDefault = defaultFieldData[item.id];
      dispatch(addFieldToSelectedForm(fieldDefault));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  if (isLoading || !selectedForm) {
    return <div />;
  }

  return (
    <div className="p-6 flex flex-1 justify-center items-center">
      <div className="flex flex-col h-full p-8 bg-zinc-50 shadow-xl rounded-sm border-zinc-500 border min-w-[700px]">
        <div className="w-full border-b pb-4">
          <div className="text-3xl">{selectedForm.displayName}</div>
          <div className="text-zinc-500 mt-1">{selectedForm.description}</div>
        </div>
        <div ref={dropRef} className="pt-4 flex-grow">
          <MetaFieldsDroppableContainer
            selectedFieldTempId={selectedTempId}
            selectedForm={selectedForm}
          />
        </div>
      </div>
    </div>
  );
};

export default StatingArea;
