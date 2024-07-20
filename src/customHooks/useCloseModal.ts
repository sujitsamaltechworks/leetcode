import { authModalState } from "@/atoms/authModalAtom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const useCloseModal = () => {
  const setAuthModal = useSetRecoilState(authModalState);

  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return closeModal;
};

export default useCloseModal;
