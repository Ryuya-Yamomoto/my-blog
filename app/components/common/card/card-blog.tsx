"use client";

import type { Blog } from "@/app/types/common";

import Link from "next/link";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";
import BadgeRounded from "../badge/badge-rounded";

import { useRef } from "react";
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
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !overlayRef.current) return;

      // デスクトップサイズかどうかを判定（768px以上）
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return;

      const overlay = overlayRef.current;

      // アニメーション用のオブジェクトを作成
      const animatedValues = { x: 50, y: 50, size: 0 };

      // React の state を介さず DOM へ直接 CSS 変数を書き込むことで
      // 毎フレームの再レンダリングを避け、滑らかに追従させる
      const xTo = gsap.quickTo(animatedValues, "x", {
        duration: 0.6,
        ease: "power3.out",
        onUpdate: () => {
          overlay.style.setProperty("--positionX", `${animatedValues.x}%`);
        },
      });
      const yTo = gsap.quickTo(animatedValues, "y", {
        duration: 0.6,
        ease: "power3.out",
        onUpdate: () => {
          overlay.style.setProperty("--positionY", `${animatedValues.y}%`);
        },
      });
      const sizeTo = gsap.quickTo(animatedValues, "size", {
        duration: 0.5,
        ease: "power3.out",
        onUpdate: () => {
          overlay.style.setProperty("--size", `${animatedValues.size}%`);
        },
      });

      const getPointerPercent = (event: PointerEvent | MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return null;

        // パーセンテージで計算
        return {
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        };
      };

      const observer = Observer.create({
        target: cardRef.current,
        type: "pointer,mouse",
        // eslint-disable-next-line
        onHover: (e: any) => {
          const position = getPointerPercent(e.event);
          if (!position) return;

          // 第2引数に開始値を渡し、前回の位置からの補間をスキップして
          // カーソル位置へ即座にジャンプさせる
          xTo(position.x, position.x);
          yTo(position.y, position.y);
          sizeTo(60);
        },
        onHoverEnd: () => {
          sizeTo(0);
        },
        // eslint-disable-next-line
        onMove: (e: any) => {
          const position = getPointerPercent(e.event);
          if (!position) return;

          // GSAPでスムーズにアニメーション（状態も自動更新）
          xTo(position.x);
          yTo(position.y);
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
        ref={overlayRef}
        className={cn(
          "place-items-[start_center] grid w-full",
          "lg:absolute lg:top-0 lg:left-0 lg:h-full lg:items-center lg:justify-items-start lg:bg-black/50 lg:p-4",
          "lg:[clip-path:circle(var(--size)_at_var(--positionX)_var(--positionY))]",
          "lg:group-focus-visible:[clip-path:inset(0_0_0_0)]"
        )}
        style={
          {
            "--positionX": "50%",
            "--positionY": "50%",
            "--size": "0%",
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
