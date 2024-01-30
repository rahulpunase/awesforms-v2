import { useDrag } from "react-dnd";

import { cn } from "@/lib/utils";
import { DnDActions, DnDItemTypes, MetaFieldBase } from "@/models";

const DraggableMetaField = ({ field }: { field: MetaFieldBase }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: DnDItemTypes.sideBarMetaFields,
    item: { action: DnDActions.dropping, id: field.type },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        canDrop: monitor.canDrag(),
      };
    },
  }));

  return (
    <div
      ref={drag}
      {...collected}
      className={cn(
        "flex flex-row bg-zinc-50 mb-2 p-3 mr-1 basis-[48%] border-zinc-300 border rounded-sm items-center justify-start cursor-move hover:shadow-md hover:border-zinc-400 transition-all",
        collected.isDragging && "border-dashed"
      )}
    >
      {<field.Icon className="w-4 h-4 mr-1" />}
      <div className="text-xs">{field.displayName}</div>
    </div>
  );
};

export default DraggableMetaField;
