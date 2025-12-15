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
  toastStatus: {
    status: "success" | "error" | undefined;
    title: string;
    message: string;
  };
  setToastStatus: (status: {
    status: "success" | "error" | undefined;
    title: string;
    message: string;
  }) => void;
  isLargeScreen: boolean;
  setIsLargeScreen: (isLarge: boolean) => void;
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
  toastStatus: { status: undefined, title: "", message: "" },
  setToastStatus: (status) => set({ toastStatus: status }),
  isLargeScreen: false,
  setIsLargeScreen: (isLarge) => set({ isLargeScreen: isLarge }),
}));

export default useStore;
