import { useSelector } from "react-redux";

import ActualForm from "@/components/ActualForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/lib/hooks/useModal";
import { RootState } from "@/store/store";

const FormPreviewModal = () => {
  const { onClose } = useModal();
  const { selectedForm } = useSelector((store: RootState) => store.builder);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            {selectedForm?.displayName}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {selectedForm?.description}
        </DialogDescription>
        <ActualForm />
      </DialogContent>
    </Dialog>
  );
};

export default FormPreviewModal;
