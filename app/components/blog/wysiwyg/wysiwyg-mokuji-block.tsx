"use client";

import React, { useState } from "react";
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
  const { activeMokujiId, setActiveMokujiId } = useStore();
  const [isMokujiOpen, setIsMokujiOpen] = useState(true);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        // top: offsetTop - 80, // ヘッダー分のオフセットなどを考慮
        top: offsetTop - window.innerHeight / 2, // ヘッダー分のオフセットなどを考慮
        behavior: "smooth",
      });
    }
  };

  if (arrayMokuji.length === 0) return null;

  return (
    <nav
      className={cn(
        "fixed top-20 right-4 z-10 hidden translate-y-0 flex-row items-stretch gap-0 rounded-lg border border-white/20 bg-white/5 shadow-xl backdrop-blur-md transition-all",
        "lg:flex",
        "2xl:top-1/2 2xl:-translate-y-1/2"
      )}
      aria-label="目次"
    >
      {/* つまみ */}
      <button
        onClick={() => setIsMokujiOpen(!isMokujiOpen)}
        className="flex w-6 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-l-lg hover:bg-white/10"
        aria-label={isMokujiOpen ? "目次を閉じる" : "目次を開く"}
      >
        <div className="h-3 w-0.5 rounded-full bg-gray-400/50" />
        <div className="h-3 w-0.5 rounded-full bg-gray-400/50" />
        <div className="h-3 w-0.5 rounded-full bg-gray-400/50" />
      </button>

      {/* 目次リスト */}
      <div
        className={cn(
          "transition-padding flex flex-col gap-2 p-4 pl-0 duration-300 ease-(--easing)",
          !isMokujiOpen && "pr-0"
        )}
      >
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-[var(--easing)]",
            isMokujiOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <p className="overflow-hidden text-sm font-bold">目次</p>
        </div>

        <ul className={cn("mt-0 flex flex-col gap-1", "")}>
          {arrayMokuji.map((item) => (
            <li key={item.id} className="pl-0 before:content-[none]">
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  "hover:text-primary cursor-pointer text-left text-xs transition-colors",
                  activeMokujiId === item.id
                    ? "text-primary font-bold"
                    : "text-primary/45"
                )}
              >
                <span
                  className={cn(
                    "grid items-baseline transition-all duration-300 ease-[var(--easing)]",
                    isMokujiOpen ? "grid-cols-[1em_1fr]" : "grid-cols-[1em_0fr]"
                  )}
                >
                  <span
                    className={cn(
                      "text-center transition-transform duration-300",
                      !isMokujiOpen && activeMokujiId === item.id && "scale-150"
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
    </nav>
  );
};

export default WysiwygMokujiBlock;
