import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/lib/hooks/useModal";

const PublishFormModal = () => {
  const { onClose } = useModal();
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Publish Form
          </DialogTitle>
        </DialogHeader>
        <div>Content...</div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishFormModal;
