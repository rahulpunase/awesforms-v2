import { useContext } from "react";

import { ModalContext, modalContext } from "../providers/ModalProvider";

export const useModal = (): ModalContext => {
  return useContext(modalContext);
};
