"use client";

import { useEffect, useRef } from "react";

export const useScrollLock = ({
  isLocked,
  resetPositionY = false,
}: {
  isLocked: boolean;
  resetPositionY?: boolean;
}) => {
  const scrollPositionY = useRef(0);
  const wasLocked = useRef(false); //- 前回ロック処理が行われたかの判別 ページリロード時の実行を防止

  useEffect(() => {
    if (isLocked) {
      // スクロール固定処理
      // 現在のスクロール位置を取得
      scrollPositionY.current = window.scrollY;

      // スタイル指定
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionY.current}px`;
      document.body.style.left = "0";
      document.body.style.width = `100%`;

      wasLocked.current = true;
    } else if (wasLocked.current) {
      // スクロール解放処理
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";

      if (resetPositionY) scrollPositionY.current = 0;

      window.scrollTo({
        top: scrollPositionY.current,
        left: 0,
        behavior: "instant",
      });
    }

    // クリーンナップ関数
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isLocked, resetPositionY]);
};
