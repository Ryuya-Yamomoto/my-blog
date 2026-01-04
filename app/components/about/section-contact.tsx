"use client";

import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);
gsap.registerPlugin(useGSAP);

const SectionContact = () => {
  const anchor = useRef<HTMLAnchorElement>(null);
  const mousePointer = useRef<HTMLSpanElement>(null);

  // リンクにホバーした際のマウス座標の取得（PC時のみ）
  useGSAP(
    () => {
      if (!anchor.current || !mousePointer.current) return;

      // デスクトップサイズかどうかを判定（768px以上）
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return;

      const xTo = gsap.quickTo(mousePointer.current, "x", {
        duration: 0.6,
        ease: "power3",
      });
      const yTo = gsap.quickTo(mousePointer.current, "y", {
        duration: 0.6,
        ease: "power3",
      });

      const observer = Observer.create({
        target: anchor.current,
        type: "pointer,mouse",
        // eslint-disable-next-line
        onMove: (e: any) => {
          const { clientX, clientY } = e.event; // e.eventから座標を取得
          const rect = anchor.current?.getBoundingClientRect();
          if (!rect) return;
          xTo(clientX - rect.left);
          yTo(clientY - rect.top);
        },
        onHover: () => {
          gsap.to(mousePointer.current, {
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
          });
        },
        onHoverEnd: () => {
          gsap.to(mousePointer.current, {
            scale: 0,
            duration: 0.3,
            ease: "power3.out",
          });
        },
      });

      // クリーンアップ関数
      return () => {
        observer.kill();
      };
    },
    { scope: anchor }
  );

  return (
    <section id="section-contact" className={cn("relative h-lvh")}>
      <a
        ref={anchor}
        href="/contact"
        className={cn(
          "font-inter absolute right-4 bottom-20 pr-16 text-4xl leading-none tracking-tighter",
          "md:text-7xl"
        )}
      >
        <span className="">CONTACT ME</span>
        <MoveRight
          strokeWidth={1}
          size={56}
          color="var(--foreground)"
          className={cn("absolute top-1/2 right-0 -translate-y-1/2")}
        />
        <span
          ref={mousePointer}
          id="mouse-pointer"
          className={cn(
            "pointer-events-none absolute top-0 left-0 z-10 block h-40 w-40 origin-center -translate-1/2 scale-0 rounded-full bg-white mix-blend-difference"
          )}
        />
      </a>
    </section>
  );
};

export default SectionContact;
