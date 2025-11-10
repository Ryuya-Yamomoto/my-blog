"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { Context } from "@/app/contexts/context";
import { Category } from "@/app/types/common";

import NavContent from "./nav-content";
import { useScrollLock } from "@/app/hooks/useScrollLock";

type HeaderProps = {
  categories: Category[];
};

const Header = ({ categories }: HeaderProps) => {
  const { isNavigationOpen, setIsNavigationOpen } = useContext(Context);
  const pathname = usePathname(); // 現在のパスを取得

  // バーガーメニュー開閉処理
  const handleIsNavigationOpen = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  // URL変更を監視
  useEffect(() => {
    // バーガーメニューを閉じる
    setIsNavigationOpen(false);
  }, [pathname, setIsNavigationOpen]);

  // スクロール固定処理
  useScrollLock(isNavigationOpen);

  return (
    <header
      className={cn(
        "transition-background fixed top-0 right-0 left-0 z-10 h-16 duration-300",
        isNavigationOpen
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
            isNavigationOpen ? "open" : ""
          )}
          onClick={handleIsNavigationOpen}
        >
          <span
            className={cn(
              "bar-01 bar",
              "bg-primary absolute top-0 right-0 block h-[2px] w-full",
              "transform-origin-center",
              isNavigationOpen ? "top-1.5 rotate-[30deg]" : ""
            )}
          ></span>
          <span
            className={cn(
              "bar-02 bar",
              "bg-primary absolute top-3 right-0 block h-[2px] w-1/2",
              "transform-origin-center",
              isNavigationOpen ? "top-1.5 w-full rotate-[-30deg]" : ""
            )}
          ></span>
        </button>
      </div>
      <NavContent
        isNavigationOpen={isNavigationOpen}
        handleIsNavigationOpen={handleIsNavigationOpen}
        categories={categories}
        currentPathname={pathname}
      />
    </header>
  );
};

export default Header;
