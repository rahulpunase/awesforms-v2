import { Plus } from "lucide-react";

import { useModal } from "@/lib/hooks/useModal";

const AddFormCard = () => {
  const { onOpen } = useModal();
  return (
    <button
      role="button"
      className="flex items-center justify-center rounded-sm w-[180px] h-[210px] bg-zinc-100 transition-all border-2 border-spacing-4  cursor-pointer hover:border-zinc-700 border-dashed hover:shadow-md"
      onClick={() => onOpen("create-form")}
    >
      <Plus className="w-8 h-8" />
    </button>
  );
};

export default AddFormCard;
