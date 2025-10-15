"use client";

import { createContext, useState, ReactNode } from "react";

interface ContextProps {
  isNavigationOpen: boolean;
  setIsNavigationOpen: (isOpen: boolean) => void;
}

export const Context = createContext<ContextProps>({
  isNavigationOpen: false,
  setIsNavigationOpen: () => {},
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);

  const value = {
    isNavigationOpen,
    setIsNavigationOpen,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
