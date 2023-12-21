import { cn } from "@/lib/utils";
import { MetaFieldBase } from "@/models";
import { useDrag } from "react-dnd";

const DraggableMetaField = ({ field }: { field: MetaFieldBase }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "meta-fields",
    item: { id: field.type },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        canDrop: monitor.canDrag(),
      };
    },
  }));
  // console.log(collected.canDrop);
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
