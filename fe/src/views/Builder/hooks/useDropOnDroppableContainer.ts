import { useRef, useState } from "react";
import { DropTargetMonitor, useDrop, XYCoord } from "react-dnd";
import { useDispatch } from "react-redux";

import {
  DnDActions,
  DnDItemTypes,
  DraggableAndDroppableItems,
  MetaFieldType,
} from "@/models";
import { AppDispatch } from "@/store/store";

import { defaultFieldData } from "../components/MetaFields/metaFieldData";
import { addFieldToSelectedForm } from "../store/builder/builder.slice";

const getOnHoverItemIndex = (
  container: HTMLDivElement,
  draggingFieldOffset: XYCoord | null
): number => {
  let _index = -1;
  container.childNodes.forEach((node, index) => {
    const _node = node as HTMLDivElement;
    const rect = _node.getBoundingClientRect();
    if (!draggingFieldOffset?.x || !draggingFieldOffset?.y) return;
    if (
      draggingFieldOffset?.x > rect.left &&
      draggingFieldOffset?.y > rect.top &&
      draggingFieldOffset.x < rect.right &&
      draggingFieldOffset.y < rect.bottom
    ) {
      _index = index;
    }
  });
  return _index;
};

const useDropOnDroppableContainer = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const dispatch = useDispatch<AppDispatch>();
  const _index = useRef(-1);
  const [hoveringIndex, setHoveringIndex] = useState(-1);

  const [collector, dropTargetRef] = useDrop(() => ({
    accept: DnDItemTypes.sideBarMetaFields,
    drop: (item: DraggableAndDroppableItems) => {
      if (item.action === DnDActions.sorting) {
        console.log("will sort");
      } else {
        const fieldDefault = defaultFieldData[item.id as MetaFieldType];
        dispatch(
          addFieldToSelectedForm({
            field: fieldDefault,
            indexToAdd: _index.current,
          })
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: unknown, monitor: DropTargetMonitor) => {
      const container = containerRef.current as HTMLDivElement;
      const draggingFieldOffset = monitor.getClientOffset();
      const indexOnWhichFieldIsHovering = getOnHoverItemIndex(
        container,
        draggingFieldOffset
      );
      setHoveringIndex(indexOnWhichFieldIsHovering);
      _index.current = indexOnWhichFieldIsHovering;
    },
  }));

  return [collector, dropTargetRef, hoveringIndex] as const;
};

export default useDropOnDroppableContainer;
