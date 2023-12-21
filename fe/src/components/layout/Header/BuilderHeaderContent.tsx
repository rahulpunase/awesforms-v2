import { BookCheck, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/hooks/useModal";

const BuilderHeaderContent = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex flex-row items-center w-full ml-4 justify-end gap-4">
      <Button variant="outline" onClick={() => onOpen("preview-form")}>
        <EyeIcon className="w-4 h-4" />
        <span className="ml-2">Preview</span>
      </Button>
      <Button>
        <BookCheck className="w-4 h-4" />
        <span className="ml-2">Publish</span>
      </Button>
    </div>
  );
};

export default BuilderHeaderContent;
