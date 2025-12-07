"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { Sun, Moon } from "lucide-react";

const ButtonTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute bottom-2 left-4">
      <button
        className={cn(
          "onFocus grid h-7 w-7 cursor-pointer place-items-center rounded-full p-1"
        )}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? (
          <Moon strokeWidth={1} color="var(--foreground)" size={21} />
        ) : (
          <Sun strokeWidth={1} color="var(--foreground)" size={21} />
        )}
      </button>
    </div>
  );
};

export default ButtonTheme;
