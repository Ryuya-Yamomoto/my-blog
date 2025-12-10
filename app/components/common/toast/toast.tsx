"use client";

import { CircleCheck, CircleX } from "lucide-react";

import { useEffect, useState } from "react";
import useStore from "@/app/store/useStore";
import { cn } from "@/lib/utils";

const Toast = () => {
  const { toastStatus, setToastStatus } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  const style = cn(
    toastStatus.status === "success" &&
      "bg-toast-green border-toast-green-text text-toast-green-text",
    toastStatus.status === "error" &&
      "bg-toast-red border-toast-red-text text-toast-red-text"
  );

  useEffect(() => {
    if (toastStatus.status) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setToastStatus({ status: undefined, title: "", message: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastStatus, setToastStatus]);

  return (
    <div
      className={cn(
        "fixed top-18 grid gap-y-1 rounded-sm border px-4 py-2 transition-[right,translate] duration-300",
        style,
        isVisible ? "right-4 translate-x-0" : "right-0 translate-x-full"
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
      <p className={cn("text-xs")}>{toastStatus.message}</p>
    </div>
  );
};

export default Toast;
