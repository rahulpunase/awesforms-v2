import React, { lazy, PropsWithChildren, Suspense, useState } from "react";

const LazyLoadedAddFormModal = lazy(
  () => import("@/components/layout/modals/AddFormModal")
);
const LazyFormPreviewModal = lazy(
  () => import("@/components/layout/modals/FormPreviewModal")
);
const LazyPublishFormModal = lazy(
  () => import("@/components/layout/modals/PublishFormModal")
);

export type ModalDefault = {
  modal: Modals;
  data?: object;
};

type Modals = "" | "create-form" | "preview-form" | "publish-form";

type ModalState = {
  modal: Modals;
  data?: unknown;
};

export type ModalContext = {
  modal: Modals;
  data?: unknown;
  onClose: () => void;
  onOpen: (modal: Modals, data?: unknown) => void;
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

  const onOpen = (modal: Modals, data?: unknown) => {
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
      <Suspense>
        {modalState.modal === "create-form" && <LazyLoadedAddFormModal />}
        {modalState.modal === "preview-form" && <LazyFormPreviewModal />}
        {modalState.modal === "publish-form" && <LazyPublishFormModal />}
      </Suspense>
    </modalContext.Provider>
  );
};

export default ModalProvider;
