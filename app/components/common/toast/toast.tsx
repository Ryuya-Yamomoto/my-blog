"use client";

import parse from "html-react-parser";

import { CircleCheck, CircleX } from "lucide-react";

import { useEffect, useState, useRef } from "react";
import useStore from "@/app/store/useStore";
import { motion, type AnimationDefinition } from "motion/react";
import { cn } from "@/lib/utils";

const Toast = () => {
  const { toastStatus, setToastStatus } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ステータスに応じたスタイル
  const statusStyle = cn(
    toastStatus.status === "success" && "bg-green-100 text-green-800",
    toastStatus.status === "error" && "bg-red-100 text-red-800"
  );

  // トースト アニメーション 定義
  const toastVariants = {
    visible: {
      right: "16px",
      opacity: 1,
      translateX: 0,
    },
    hidden: {
      opacity: 0,
      right: 0,
      translateX: 100,
    },
  };

  // トースト アニメーションが完了した際に呼ばれる処理
  const handleAnimationComplete = (definition: AnimationDefinition) => {
    if (definition === "visible") {
      // 表示処理完了後の処理
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } else {
      // 非表示処理完了後の処理
      setToastStatus({
        status: undefined,
        title: "",
        message: "",
      });
    }
  };

  useEffect(() => {
    if (toastStatus.status !== undefined) {
      setIsVisible(true);
    }

    // クリーンナップ
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [toastStatus, setToastStatus]);

  return (
    <motion.div
      className={cn(
        "fixed top-18 z-1 grid w-64 gap-y-1 rounded-sm px-4 py-2 shadow-sm",
        statusStyle
      )}
      initial={"hidden"}
      variants={toastVariants}
      animate={isVisible ? "visible" : "hidden"}
      transition={{ ease: [0.9, 0.03, 0.49, 1.02], duration: 0.3 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className={cn("flex items-center gap-x-1 text-xs font-medium")}>
        {toastStatus.status === "success" && (
          <CircleCheck strokeWidth={1} color="var(--color-green-800)" />
        )}
        {toastStatus.status === "error" && (
          <CircleX strokeWidth={1} color="var(--color-red-800)" />
        )}
        <p>{toastStatus.title}</p>
      </div>
      <p className={cn("text-xs")}>{parse(toastStatus.message)}</p>
    </motion.div>
  );
};

export default Toast;
