"use client";

import { usePathname } from "next/navigation";
import useStore from "@/app/store/useStore";
import { useEffect, useRef } from "react";
import { useScrollLock } from "@/app/hooks/useScrollLock";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Category, Blog } from "@/app/types/common";

import Logo from "./logo";
import ButtonTheme from "./button-theme";
import NavContent from "./nav-content";
import KensakuContent from "./kensaku-content";

type HeaderProps = {
  categories: Category[];
  blogs: Blog[];
};

const Header = ({ categories, blogs }: HeaderProps) => {
  // 現在のパスを取得
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // main 要素を取得
  const mainRef = useRef<HTMLElement | null>(null);

  // Storeから開閉の状態を取得
  const { isMenuOpen, setMenuOpen, isKensakuOpen, setKensakuOpen } = useStore();

  // pathname変更検知
  const hasPathnameChanged = prevPathnameRef.current !== pathname;

  // URL変更を監視
  useEffect(() => {
    window.scrollTo(0, 0);

    // バーガーメニューを閉じる
    setMenuOpen(false);
    setKensakuOpen(false);
    prevPathnameRef.current = pathname;
  }, [pathname, setMenuOpen, setKensakuOpen]);

  // マウント時を監視
  useEffect(() => {
    mainRef.current = window.document.querySelector("main");
  }, []);

  // メニューやケンサク開閉時のinert属性制御
  useEffect(() => {
    if (mainRef.current) {
      if (isMenuOpen || isKensakuOpen) {
        mainRef.current.setAttribute("inert", "true");
      } else {
        mainRef.current.removeAttribute("inert");
      }
    }
  }, [isMenuOpen, isKensakuOpen]);

  // スクロール固定処理（pathname変更時はリセット）
  useScrollLock({
    isLocked: isMenuOpen || isKensakuOpen,
    resetPositionY: hasPathnameChanged,
  });

  // バーガーメニュー 状態更新ハンドラー
  const handleSetMenuOpen = (isOpen: boolean) => {
    setKensakuOpen(false);
    setMenuOpen(isOpen);
  };

  // 検索モーダル 状態更新ハンドラー
  const handleSetKensakuOpen = (isOpen: boolean) => {
    setMenuOpen(false);
    setKensakuOpen(isOpen);
  };

  return (
    <header
      className={cn(
        "transition-background fixed top-0 right-0 left-0 z-100 h-16 duration-300",
        isMenuOpen || isKensakuOpen
          ? "bg-background"
          : "bg-background/70 border-border border-b backdrop-blur-[2px]"
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
        <Logo />

        <div className={cn("relative z-10 flex items-center gap-x-4")}>
          <ButtonTheme />
          <button
            className="onFocus cursor-pointer"
            onClick={() => handleSetKensakuOpen(!isKensakuOpen)}
          >
            <span>
              <Image
                src="/images/common/icon_search.svg"
                alt="検索"
                width={28}
                height={28}
                className="dark-filter-to-foreground"
              />
            </span>
          </button>
          <button
            className={cn(
              "onFocus relative block h-3 w-10 cursor-pointer",
              "hamMenuTransition",
              isMenuOpen ? "open" : ""
            )}
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => handleSetMenuOpen(!isMenuOpen)}
          >
            <span
              className={cn(
                "bar-01 bar",
                "bg-foreground absolute top-0 right-0 block h-[2px] w-full",
                "transform-origin-center",
                isMenuOpen ? "top-1.5 rotate-[30deg]" : ""
              )}
            ></span>
            <span
              className={cn(
                "bar-02 bar",
                "bg-foreground absolute top-3 right-0 block h-[2px] w-1/2",
                "transform-origin-center",
                isMenuOpen ? "top-1.5 w-full rotate-[-30deg]" : ""
              )}
            ></span>
          </button>
        </div>
      </div>
      <KensakuContent
        isOpen={isKensakuOpen}
        handleOpen={handleSetKensakuOpen}
        blogs={blogs}
      />
      <NavContent
        categories={categories}
        currentPathname={pathname}
        isOpen={isMenuOpen}
        handleOpen={handleSetMenuOpen}
      />
    </header>
  );
};

export default Header;
