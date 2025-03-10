import { useState } from "react";

/**
 * モーダルの状態を管理する
 */
export const useModal = (initialValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialValue || false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

export const CLOSE_ICON = "×";
