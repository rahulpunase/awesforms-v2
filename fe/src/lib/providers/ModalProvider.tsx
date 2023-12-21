import React, { PropsWithChildren, useState } from "react";

import AddFormModal from "@/components/layout/modals/AddFormModal";
import FormPreviewModal from "@/components/layout/modals/FormPreviewModal";

export type ModalDefault = {
  modal: Modals;
  data?: object;
};

type Modals = "" | "create-form" | "preview-form";

type ModalState = {
  modal: Modals;
  data?: object;
};

export type ModalContext = {
  modal: Modals;
  data?: object;
  onClose: () => void;
  onOpen: (modal: Modals, data?: object) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const modalContext = React.createContext<ModalContext>({
  modal: "",
  data: {},
  onOpen: () => {},
  onClose: () => {},
});

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({
    modal: "",
    data: {},
  });

  const onOpen = (modal: Modals, data?: object) => {
    setModalState({
      modal,
      data,
    });
  };

  const onClose = () => {
    setModalState({
      modal: "",
      data: {},
    });
  };

  return (
    <modalContext.Provider
      value={{
        modal: modalState.modal,
        data: modalState.data,
        onOpen,
        onClose,
      }}
    >
      {children}
      {modalState.modal === "create-form" && <AddFormModal />}
      {modalState.modal === "preview-form" && <FormPreviewModal />}
    </modalContext.Provider>
  );
};

export default ModalProvider;
