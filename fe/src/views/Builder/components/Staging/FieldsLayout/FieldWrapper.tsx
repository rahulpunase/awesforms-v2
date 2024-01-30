import { GripVertical, Info, TrashIcon } from "lucide-react";
import React, { PropsWithChildren, useRef } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import { AppDispatch } from "@/store/store";
import {
  setForDelete,
  setSelectedTempId,
} from "@/views/Builder/store/builder/builder.slice";

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
  const innerRef = useRef<HTMLDivElement>(null);

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: tempId,
    item: { id: "SORTING", item: tempId },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        canDrop: monitor.canDrag(),
        item: monitor.getItem(),
      };
    },
  }));

  if (collected.isDragging) {
    const boundingRect = innerRef.current?.getBoundingClientRect();
    return (
      <div
        style={{
          height: boundingRect?.height + "px",
          width: boundingRect?.width + "px",
        }}
        className="border-2 border-dashed border-zinc-500 mb-4 rounded-sm"
      ></div>
    );
  }

  return (
    <div
      className={cn(
        "relative mb-4 bg-white pt-4 pb-4 pr-4 pl-2 border border-zinc-500 rounded-sm cursor-pointer",
        isSelected && "border-2 shadow-lg"
      )}
      onClick={onClickHandler}
      ref={dragPreview}
      id={tempId}
    >
      <div
        className="absolute w-full h-full top-0 left-0 flex flex-row items-center z-10 group/item"
        ref={innerRef}
      >
        <div className="mr-2 cursor-move text-zinc-400 ml-1" ref={drag}>
          <GripVertical />
        </div>
        <div className="absolute top-0 right-0 p-2 px-4 rounded-bl-sm shadow-md items-center border-l border-b border-zinc-500 gap-x-4 hidden group-hover/item:flex">
          <button>
            <Info className="w-4 h-4" />
          </button>
          <button
            className="text-rose-600"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                setForDelete({
                  tempId,
                })
              );
            }}
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
