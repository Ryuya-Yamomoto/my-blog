"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useLayoutEffect } from "react";
import Lenis from "@studio-freight/lenis";
import useStore from "@/app/store/useStore";

export const LenisProvider = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const setLenis = useStore((state) => state.setLenis);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    // スクロールロックなどから参照できるようストアに共有
    setLenis(lenisRef.current);

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [setLenis]);

  // URL変更時を監視
  useLayoutEffect(() => {
    lenisRef.current?.stop();
    const timer = setTimeout(() => {
      lenisRef.current?.start();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
