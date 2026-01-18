"use client";

import type { Blog } from "@/app/types/common";

import Link from "next/link";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";
import BadgeRounded from "../badge/badge-rounded";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import StripHtmlTags from "@/utils/common/stripHtmlTags";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);
gsap.registerPlugin(useGSAP);

type CardBlogProps = {
  blog: Blog;
  isViewTransition?: boolean;
};

const CardBlog = ({ blog, isViewTransition = true }: CardBlogProps) => {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [pointX, setPointX] = useState(50);
  const [pointY, setPointY] = useState(50);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      // デスクトップサイズかどうかを判定（768px以上）
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return;

      // アニメーション用のオブジェクトを作成
      const animatedValues = { x: 50, y: 50 };

      const xTo = gsap.quickTo(animatedValues, "x", {
        duration: 0.6,
        ease: "power3.out",
        onUpdate: () => {
          setPointX(Math.trunc(animatedValues.x));
        },
      });
      const yTo = gsap.quickTo(animatedValues, "y", {
        duration: 0.6,
        ease: "power3.out",
        onUpdate: () => {
          setPointY(Math.trunc(animatedValues.y));
        },
      });

      const observer = Observer.create({
        target: cardRef.current,
        type: "pointer,mouse",
        // eslint-disable-next-line
        onMove: (e: any) => {
          const { clientX, clientY } = e.event; // e.eventから座標を取得
          const rect = cardRef.current?.getBoundingClientRect();
          if (!rect) return;

          // パーセンテージで計算
          const x = ((clientX - rect.left) / rect.width) * 100;
          const y = ((clientY - rect.top) / rect.height) * 100;

          // GSAPでスムーズにアニメーション（状態も自動更新）
          xTo(x);
          yTo(y);
        },
      });

      // クリーンアップ関数
      return () => {
        observer.kill();
      };
    },
    { scope: cardRef }
  );

  return (
    <Link
      ref={cardRef}
      href={`/blog/post/${blog.id}`}
      className={cn(
        "group relative grid w-full grid-cols-[40%_1fr] gap-x-2 outline-0",
        "lg:aspect-square lg:grid-cols-1 lg:gap-x-0 lg:overflow-hidden"
      )}
    >
      <figure
        className={cn(
          "block aspect-square w-full overflow-hidden rounded-sm lg:rounded-none",
          blog.thumbnail ?? "bg-foreground/50 grid place-items-center"
        )}
      >
        {blog.thumbnail &&
          (isViewTransition ? (
            <ViewTransition name={`thumb-${blog.id}`}>
              <Image
                src={blog.thumbnail.url}
                alt={blog.title}
                height={blog.thumbnail.height}
                width={blog.thumbnail.width}
                className="h-full w-full object-cover"
              />
            </ViewTransition>
          ) : (
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              height={blog.thumbnail.height}
              width={blog.thumbnail.width}
              className="h-full w-full object-cover"
            />
          ))}

        {!blog.thumbnail && (
          <Image
            src="/images/common/icon_no-image.svg"
            alt="No Image"
            height={42}
            width={42}
          />
        )}
      </figure>
      <div
        className={cn(
          "place-items-[start_center] grid w-full",
          "lg:absolute lg:top-0 lg:left-0 lg:h-full lg:items-center lg:justify-items-start lg:bg-black/50 lg:p-4",
          "lg:[clip-path:circle(0%_at_var(--positionX)_var(--positionY))]",
          "lg:group-hover:[clip-path:circle(60%_at_var(--positionX)_var(--positionY))]",
          "lg:group-focus-visible:[clip-path:inset(0_0_0_0)]"
        )}
        style={
          {
            "--positionX": `${pointX}%`,
            "--positionY": `${pointY}%`,
          } as React.CSSProperties
        }
      >
        <div className="lg:text-white">
          <p
            className={cn(
              "line-clamp-1 text-xl font-bold",
              "md:text-2xl",
              "lg:text-xl"
            )}
          >
            {blog.title}
          </p>
          <div className="mt-2 flex items-baseline gap-x-2">
            <BadgeRounded
              text={blog.category.name}
              className={cn("text-foreground", "lg:text-white")}
            />
            <p className="font-inter mt-1 text-xs">
              {format(new Date(blog.publishedAt), "yyyy.MM.dd")}
            </p>
          </div>
          <p className={cn("mt-4 line-clamp-2 text-sm")}>
            {StripHtmlTags(blog.body)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;
