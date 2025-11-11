"use client";

import { usePathname } from "next/navigation";
import useStore from "@/app/store/useStore";
import { useEffect } from "react";
import { useScrollLock } from "@/app/hooks/useScrollLock";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Category } from "@/app/types/common";

import NavContent from "./nav-content";

type HeaderProps = {
  categories: Category[];
};

const Header = ({ categories }: HeaderProps) => {
  // 現在のパスを取得
  const pathname = usePathname();

  // Storeから開閉の状態を取得
  const { isMenuOpen, setMenuOpen } = useStore();

  // URL変更を監視
  useEffect(() => {
    // バーガーメニューを閉じる
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  // スクロール固定処理
  useScrollLock(isMenuOpen);

  // 状態更新ハンドラー
  const handleSetMenuOpen = (isOpen: boolean) => {
    setMenuOpen(isOpen);
  };

  return (
    <header
      className={cn(
        "transition-background fixed top-0 right-0 left-0 z-10 h-16 duration-300",
        isMenuOpen
          ? "bg-background"
          : "bg-background/70 border-border border-b backdrop-blur-[2px]"
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
        <h1 className="z-1 w-56">
          <Link href="/" className="block w-full">
            <Image
              src="/images/common/logo.svg"
              alt="RYUYA YAMAMOTO"
              height="200"
              width="200"
              priority
              className="h-auto w-full"
            />
          </Link>
        </h1>
        <button
          className={cn(
            "relative z-1 block h-3 w-10 cursor-pointer",
            "hamMenuTransition",
            isMenuOpen ? "open" : ""
          )}
          onClick={() => handleSetMenuOpen(!isMenuOpen)}
        >
          <span
            className={cn(
              "bar-01 bar",
              "bg-primary absolute top-0 right-0 block h-[2px] w-full",
              "transform-origin-center",
              isMenuOpen ? "top-1.5 rotate-[30deg]" : ""
            )}
          ></span>
          <span
            className={cn(
              "bar-02 bar",
              "bg-primary absolute top-3 right-0 block h-[2px] w-1/2",
              "transform-origin-center",
              isMenuOpen ? "top-1.5 w-full rotate-[-30deg]" : ""
            )}
          ></span>
        </button>
      </div>
      <NavContent
        categories={categories}
        currentPathname={pathname}
        isMenuOpen={isMenuOpen}
        handleMenuOpen={handleSetMenuOpen}
      />
    </header>
  );
};

export default Header;
