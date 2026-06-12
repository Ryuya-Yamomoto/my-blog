"use client";

import { useEffect } from "react";
import useStore from "@/app/store/useStore";

// スクロールロック
// body を position: fixed にする方式は window.scrollY が 0 にリセットされ、
// ScrollTrigger（scrub）や position: sticky が巻き戻ってしまうため、
// スクロール位置を保持したまま overflow: hidden + Lenis の停止でロックする
export const useScrollLock = ({ isLocked }: { isLocked: boolean }) => {
  const lenis = useStore((state) => state.lenis);

  useEffect(() => {
    if (!isLocked) return;

    // スクロールバー消失によるガタつき防止
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // クリーンナップ関数（ロック解除）
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
      lenis?.start();
    };
  }, [isLocked, lenis]);
};
