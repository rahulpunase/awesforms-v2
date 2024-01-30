import { useSelector } from "react-redux";

import {
  selectIsBuilderLoading,
  selectSelectedForm,
  selectSelectedTempId,
} from "../../store/builder/builder.selectors";
import MetaFieldsDroppableContainer from "./MetaFieldsDroppableContainer";

const StatingArea = () => {
  const selectedForm = useSelector(selectSelectedForm);
  const selectedTempId = useSelector(selectSelectedTempId);
  const isBuilderLoading = useSelector(selectIsBuilderLoading);

  if (isBuilderLoading || !selectedForm) {
    return <div />;
  }

  return (
    <div className="p-6 flex flex-1 justify-center items-center">
      <div className="flex flex-col h-full p-8 bg-zinc-50 shadow-xl rounded-sm border-zinc-500 border min-w-[700px]">
        <div className="w-full border-b pb-4">
          <div className="text-3xl">{selectedForm.displayName}</div>
          <div className="text-zinc-500 mt-1">{selectedForm.description}</div>
        </div>
        <div className="pt-4 flex-grow">
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
