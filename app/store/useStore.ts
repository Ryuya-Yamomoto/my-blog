import { create } from "zustand";
import type Lenis from "@studio-freight/lenis";

type StoreState = {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis | null) => void;
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
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
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
