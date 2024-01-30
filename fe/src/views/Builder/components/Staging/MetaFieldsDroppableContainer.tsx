import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { FormDetails } from "@/models";

import useDropOnDroppableContainer from "../../hooks/useDropOnDroppableContainer";
import { selectSelectedTempIdToDelete } from "../../store/builder/builder.selectors";
import { DeleteAlert } from "./DeleteAlert";
import FieldsLayout from "./FieldsLayout";
import NoField from "./NoField";

const MetaFieldsDroppableContainer = ({
  selectedForm,
  selectedFieldTempId,
}: {
  selectedForm: FormDetails;
  selectedFieldTempId: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [collector, dropTargetRef, hoveringIndex] =
    useDropOnDroppableContainer(containerRef);
  const selectedTempIdToDelete = useSelector(selectSelectedTempIdToDelete);

  return (
    <div className="h-full">
      {selectedForm.pages?.map((page) => (
        <Fragment key={page.pageNumber}>
          <div className="text-center pb-2">Page {page.pageNumber}</div>
          <div
            ref={(element) => {
              containerRef.current = element;
              dropTargetRef(element);
            }}
          >
            {!page.fields.length && <NoField />}
            {page.fields.map((field, index) => (
              <div key={field.tempId}>
                <FieldsLayout
                  selectedFieldTempId={selectedFieldTempId}
                  tempId={field.tempId}
                  type={field.type}
                  config={field.config}
                />
                {collector.isOver && index === hoveringIndex && (
                  <div className="animate-pulse mb-4 border border-dashed h-[80px] border-zinc-500 rounded-sm flex items-center justify-center bg-zinc-300 transition-all">
                    <div className="text-sm">
                      Drop the field. It will be inserted here
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Fragment>
      ))}
      {selectedTempIdToDelete && <DeleteAlert />}
    </div>
  );
};

export default MetaFieldsDroppableContainer;
