import { create } from "zustand";

type StoreState = {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  isKensakuOpen: boolean;
  setKensakuOpen: (isOpen: boolean) => void;
  activeMokujiId: string | null;
  setActiveMokujiId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const useStore = create<StoreState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  isKensakuOpen: false,
  setKensakuOpen: (isOpen) => set({ isKensakuOpen: isOpen }),
  activeMokujiId: null,
  setActiveMokujiId: (id) => set({ activeMokujiId: id }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useStore;
