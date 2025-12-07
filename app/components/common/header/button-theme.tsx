"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { Sun, Moon } from "lucide-react";

type ButtonThemeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonTheme = (props: ButtonThemeProps) => {
  const { className, ...rest } = props;

  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className={cn(
        "absolute bottom-2 left-4 grid h-7 w-7 cursor-pointer place-items-center rounded-full p-1 outline-none",
        "before:background before:absolute before:-inset-1 before:rounded-sm before:bg-transparent before:duration-300 before:content-['']",
        "hover:before:bg-foreground/10",
        "focus:before:bg-foreground/10",
        className
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        const target = e.currentTarget as HTMLButtonElement;
        target.blur();
      }}
      {...rest}
    >
      {resolvedTheme === "dark" ? (
        <Moon strokeWidth={1} color="var(--foreground)" size={21} />
      ) : (
        <Sun strokeWidth={1} color="var(--foreground)" size={21} />
      )}
    </button>
  );
};

export default ButtonTheme;
