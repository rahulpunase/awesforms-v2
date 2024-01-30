import { BookCheck, EyeIcon } from "lucide-react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/hooks/useModal";
import { selectSelectedForm } from "@/views/Builder/store/builder/builder.selectors";

const BuilderHeaderContent = () => {
  const { onOpen } = useModal();
  const selectedForm = useSelector(selectSelectedForm);
  return (
    <div className="flex flex-row items-center w-full ml-4 justify-end gap-4">
      <Button
        variant="outline"
        onClick={() => onOpen("preview-form", selectedForm)}
      >
        <EyeIcon className="w-4 h-4" />
        <span className="ml-2">Preview</span>
      </Button>
      <Button onClick={() => onOpen("publish-form")}>
        <BookCheck className="w-4 h-4" />
        <span className="ml-2">Publish</span>
      </Button>
    </div>
  );
};

export default BuilderHeaderContent;
