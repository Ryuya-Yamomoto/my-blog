"use client";

import React, { useState, useEffect, useRef } from "react";
import useStore from "@/app/store/useStore";
import { cn } from "@/lib/utils";

type MokujiItem = {
  id: string;
  text: string;
};

type WysiwygMokujiBlockProps = {
  arrayMokuji: MokujiItem[];
};

const WysiwygMokujiBlock = ({ arrayMokuji }: WysiwygMokujiBlockProps) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const { activeMokujiId, setActiveMokujiId } = useStore();
  const [isMokujiOpen, setIsMokujiOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMokujiOpen(false);
    }

    headerRef.current = window.document.querySelector("header");
  }, []);

  // スクロール位置から「現在のセクション」を判定してアクティブな目次を更新する
  // セクション = 見出しから次の見出しの手前までの塊
  useEffect(() => {
    if (arrayMokuji.length === 0) return;

    let rafId: number | null = null;

    const updateActiveMokuji = () => {
      rafId = null;

      // 判定の基準ライン（ヘッダーの下端）
      const readingLine = (headerRef.current?.clientHeight ?? 0) + 1;

      const headings = arrayMokuji
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);
      if (headings.length === 0) return;

      // 基準ラインを越えている最後の見出し = 現在のセクション
      let activeId: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= readingLine) {
          activeId = heading.id;
        }
      }

      // 記事本文の下端（= 最後のセクションの終わり）を越えたらアクティブを外す
      const articleBottom = headings[headings.length - 1]
        .closest(".wysiwyg")
        ?.getBoundingClientRect().bottom;
      if (articleBottom !== undefined && articleBottom < readingLine) {
        activeId = null;
      }

      if (useStore.getState().activeMokujiId !== activeId) {
        setActiveMokujiId(activeId);
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(updateActiveMokuji);
    };

    updateActiveMokuji();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      setActiveMokujiId(null);
    };
  }, [arrayMokuji, setActiveMokujiId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top:
          offsetTop - (headerRef.current ? headerRef.current.clientHeight : 0),
        behavior: "smooth",
      });
    }
  };

  if (arrayMokuji.length === 0) return null;

  return (
    <nav
      className={cn(
        "fixed bottom-2 left-1/2 z-10 flex w-[80%] -translate-x-1/2 flex-col items-stretch gap-0 rounded-lg border border-white/20 bg-white/5 shadow-xl backdrop-blur-xs transition-all",
        "md:top-20 md:right-4 md:bottom-auto md:left-auto md:w-auto md:translate-x-0 md:flex-row"
      )}
      aria-label="目次"
    >
      {/* つまみ */}
      <button
        onClick={() => setIsMokujiOpen(!isMokujiOpen)}
        className={cn(
          "flex h-6 w-full cursor-pointer flex-col items-center justify-center gap-0.5 rounded-t-lg outline-none md:h-auto md:w-6 md:rounded-l-lg md:rounded-tr-none",
          "hover:bg-white/10 focus-visible:bg-white/10",
          "md:flex-row"
        )}
        aria-label={isMokujiOpen ? "目次を閉じる" : "目次を開く"}
      >
        <div
          className={cn(
            "bg-foreground/50 h-0.5 w-4 rounded-full",
            "md:h-4 md:w-0.5"
          )}
        />
        <div
          className={cn(
            "bg-foreground/50 h-0.5 w-4 rounded-full",
            "md:h-4 md:w-0.5"
          )}
        />
      </button>

      {/* 目次リスト */}
      <div
        className={cn(
          "grid w-full transition-[grid-template-rows] duration-300 ease-[var(--easing)]",
          isMokujiOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "md:contents"
        )}
      >
        <div className="overflow-hidden md:contents">
          <div
            className={cn(
              "transition-padding flex flex-col gap-2 p-4 duration-300 ease-[var(--easing)] md:pl-0",
              !isMokujiOpen && "pr-0"
            )}
          >
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[var(--easing)]",
                isMokujiOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <p className="overflow-hidden text-sm font-medium">目次</p>
            </div>

            <ul
              className={cn(
                "no-defaultScrollbar mt-0 flex max-h-[20rem] flex-col gap-1 overflow-y-auto overscroll-contain"
              )}
              data-lenis-prevent
            >
              {arrayMokuji.map((item) => (
                <li key={item.id} className="pl-0 before:content-[none]">
                  <button
                    onClick={() => handleClick(item.id)}
                    className={cn(
                      "onFocus hover:text-foreground cursor-pointer text-left text-xs transition-colors",
                      activeMokujiId === item.id
                        ? "text-foreground font-medium"
                        : "text-foreground/45"
                    )}
                  >
                    <span
                      className={cn(
                        "grid items-baseline transition-all duration-300 ease-[var(--easing)]",
                        isMokujiOpen
                          ? "grid-cols-[1em_1fr]"
                          : "grid-cols-[1em_0fr]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-center transition-transform duration-300",
                          !isMokujiOpen &&
                            activeMokujiId === item.id &&
                            "scale-150"
                        )}
                      >
                        ・
                      </span>
                      <span
                        className={cn(
                          "min-w-0 overflow-hidden transition-[max-height] duration-300 ease-[var(--easing)]",
                          isMokujiOpen ? "max-h-[20rem]" : "max-h-[1.5em]"
                        )}
                      >
                        <div className="w-40">{item.text}</div>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WysiwygMokujiBlock;
