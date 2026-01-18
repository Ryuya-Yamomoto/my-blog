"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

// アコーディオンのコンテキスト型定義
type AccordionContextType = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

// コンテキストの作成
const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

// カスタムフック：アコーディオンコンテキストを使用
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
};

// AccordionProvider：開閉状態を管理
const AccordionProvider = ({
  children,
  defaultOpen = false,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const value = {
    isOpen,
    toggle,
    open,
    close,
  };

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};

// AccordionProviderの内部でisOpenにアクセスする内部コンポーネント
const AccordionWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { isOpen } = useAccordion();

  return (
    <div
      className={cn("group", className)}
      data-open={isOpen ? "true" : "false"}
    >
      {children}
    </div>
  );
};

const Accordion = ({
  className,
  children,
  defaultOpen = false,
}: {
  className?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) => {
  return (
    <AccordionProvider defaultOpen={defaultOpen}>
      <AccordionWrapper className={className}>{children}</AccordionWrapper>
    </AccordionProvider>
  );
};

const AccordionTrigger = ({
  className,
  children,
  onClick,
  ...rest
}: {
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) => {
  const { toggle } = useAccordion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle();
    onClick?.(e);
  };

  return (
    <button className={cn(className)} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

const AccordionTarget = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { isOpen } = useAccordion();

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-(--easing)",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className
      )}
      inert={!isOpen}
    >
      <div className={cn("overflow-hidden")}>{children}</div>
    </div>
  );
};

const AccordionTargetInner = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("py-2", className)}>{children}</div>;
};

export { Accordion, AccordionTrigger, AccordionTarget, AccordionTargetInner };
