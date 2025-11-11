import { create } from "zustand";

type StoreState = {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

const useStore = create<StoreState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));

export default useStore;
