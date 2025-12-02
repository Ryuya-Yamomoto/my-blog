"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import Image from "next/image";

const ButtonTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        className={cn(
          "onFocus grid h-7 w-7 cursor-pointer place-items-center rounded-full p-1",
          resolvedTheme === "dark" ? "bg-green-soft" : "bg-red-soft"
        )}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? (
          <Image
            src="/images/common/icon_dark.svg"
            alt="ダークモード"
            width={24}
            height={24}
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            src="/images/common/icon_light.svg"
            alt="ライトモード"
            width={24}
            height={24}
            className="h-full w-full object-contain filter-[invert(1)]"
          />
        )}
      </button>
    </div>
  );
};

export default ButtonTheme;
