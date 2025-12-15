"use client";

import { useEffect } from "react";
import useStore from "@/app/store/useStore";

export default function MediaQueryProvider() {
  const setIsLargeScreen = useStore((state) => state.setIsLargeScreen);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    // 初期値を設定
    setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setIsLargeScreen]);

  return null;
}
