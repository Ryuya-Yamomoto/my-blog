import { create } from "zustand";
import type { Category } from "../types/common";

type StoreState = {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

const useStore = create<StoreState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

export default useStore;
