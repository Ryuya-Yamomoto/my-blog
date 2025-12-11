"use client";

import parse from "html-react-parser";

import { CircleCheck, CircleX } from "lucide-react";

import { useEffect, useState } from "react";
import useStore from "@/app/store/useStore";
import { cn } from "@/lib/utils";

const Toast = () => {
  const { toastStatus, setToastStatus } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  const style = cn(
    toastStatus.status === "success" && "bg-toast-green text-toast-green-text",
    toastStatus.status === "error" && "bg-toast-red text-toast-red-text"
  );

  useEffect(() => {
    if (toastStatus.status) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      const timer_02 = setTimeout(() => {
        setToastStatus({ status: undefined, title: "", message: "" });
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer_02);
      };
    }
  }, [toastStatus, setToastStatus]);

  return (
    <div
      className={cn(
        "easing-(--easing) fixed top-18 z-1 grid w-64 gap-y-1 rounded-sm px-4 py-2 shadow-sm transition-[right,translate,opacity] duration-300",
        style,
        isVisible
          ? "right-4 translate-x-0 opacity-100"
          : "right-0 translate-x-full opacity-0"
      )}
    >
      <div className={cn("flex items-center gap-x-1 text-xs font-medium")}>
        {toastStatus.status === "success" && (
          <CircleCheck strokeWidth={1} color="var(--toast-green-text)" />
        )}
        {toastStatus.status === "error" && (
          <CircleX strokeWidth={1} color="var(--toast-red-text)" />
        )}
        <p>{toastStatus.title}</p>
      </div>
      <p className={cn("text-xs")}>{parse(toastStatus.message)}</p>
    </div>
  );
};

export default Toast;
