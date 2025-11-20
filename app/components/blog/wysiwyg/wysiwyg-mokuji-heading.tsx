"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useStore from "@/app/store/useStore";

type WysiwygMokujiHeadingProps = {
  id: string;
  text: string;
};

const WysiwygMokujiHeading = ({ id, text }: WysiwygMokujiHeadingProps) => {
  const { activeMokujiId, setActiveMokujiId } = useStore();
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "-50% 0px -50% 0px",
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
  }, []);

  return (
    <h2 id={id} ref={ref}>
      {text}
    </h2>
  );
};

export default WysiwygMokujiHeading;
