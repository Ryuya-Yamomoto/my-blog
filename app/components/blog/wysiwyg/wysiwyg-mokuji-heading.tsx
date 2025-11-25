"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import useStore from "@/app/store/useStore";

type WysiwygMokujiHeadingProps = {
  id: string;
  text: string;
};

const WysiwygMokujiHeading = ({ id, text }: WysiwygMokujiHeadingProps) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const { activeMokujiId, setActiveMokujiId } = useStore();

  // ヘッダーの高さを取得し、IntersectionObserverを初期化
  const [rootMargin, setRootMargin] = useState("-100px 0px -100px 0px");

  useEffect(() => {
    if (typeof window !== "undefined") {
      headerRef.current = window.document.querySelector("header");
      const headerHeight = headerRef.current
        ? headerRef.current.clientHeight
        : 0;
      setRootMargin(
        `-${headerHeight}px 0px ${(window.innerHeight - headerHeight) * -1}px 0px`
      );
    }
  }, []);

  const { ref, inView } = useInView({
    root: null,
    rootMargin: rootMargin,
    threshold: 0,
  });

  // 交差した際にアクティブの目次を更新
  useEffect(() => {
    if (inView && activeMokujiId !== id) {
      setActiveMokujiId(id);
    }
  }, [inView, setActiveMokujiId, id, activeMokujiId]);

  // クリーンナップ関数 アンマウント時はnullに戻す
  useEffect(() => {
    return () => {
      if (activeMokujiId === id) setActiveMokujiId(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h2 id={id} ref={ref}>
      {text}
    </h2>
  );
};

export default WysiwygMokujiHeading;
