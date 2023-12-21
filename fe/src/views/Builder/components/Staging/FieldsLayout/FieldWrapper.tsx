import { GripVertical, Info, TrashIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import {
  deleteField,
  setSelectedTempId,
} from "@/store/slice/builder/builder.slice";
import { AppDispatch } from "@/store/store";

type FieldWrapperProps = PropsWithChildren & {
  tempId: string;
  selectedFieldTempId: string;
  label: string;
  isRequired: boolean;
  isVisible: boolean;
};

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  tempId,
  isRequired,
  selectedFieldTempId,
  label,
  isVisible,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const onClickHandler = () => dispatch(setSelectedTempId(tempId));
  const isSelected = selectedFieldTempId === tempId;
  return (
    <div
      className={cn(
        "relative mb-4 bg-white pt-4 pb-4 pr-4 pl-2 border border-zinc-500 rounded-sm transition-all",
        isSelected && "border-2 shadow-lg"
      )}
      onClick={onClickHandler}
    >
      <div className="absolute w-full h-full top-0 left-0 flex flex-row items-center z-10 group/item">
        <div className="mr-2 cursor-move text-zinc-400 ml-1">
          <GripVertical />
        </div>
        <div className="absolute top-0 right-0 p-2 px-4 rounded-bl-sm shadow-md items-center border-l border-b border-zinc-500 gap-x-4 hidden group-hover/item:flex">
          <button>
            <Info className="w-4 h-4" />
          </button>
          <button
            className="text-rose-600"
            onClick={() =>
              dispatch(
                deleteField({
                  tempId,
                })
              )
            }
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-row items-center ml-6",
          !isVisible && "opacity-25"
        )}
      >
        <div className="flex-grow">
          <div className="mb-2">
            {label} {isRequired && <span className="text-rose-600">*</span>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FieldWrapper;
