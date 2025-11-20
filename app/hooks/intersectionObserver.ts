"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

type IntersectionObserverProps = {
  node: ReactNode;
  rootMargin?: string;
  isIntersectingCallback: () => void;
};

export const IntersectionObserver = ({
  node,
  rootMargin,
  isIntersectingCallback,
}: IntersectionObserverProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const nodeRef = useRef<HTMLElement>(null);

  // 監視をセット
  useEffect(() => {
    if (!nodeRef.current) return;

    const observer = new window.IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("交差したよ");

            // setIsIntersecting(true);
            // isIntersectingCallback();
          }
        });
      },
      {
        root: null,
        rootMargin: rootMargin || "0px",
        threshold: 0,
      }
    );

    // 要素の監視を開始
    observer.observe(nodeRef.current);

    // クリーンアップ
    return () => {
      observer.disconnect();
    };
  }, [rootMargin, isIntersectingCallback]);

  return node;
};
