"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/all";
import ButtonClose from "../common/button/button-close";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Flip);

const SectionGallery = () => {
  const [detailItem, setDetailItem] = useState<{
    img: string;
    title: string;
    artist: string;
    year: string;
    spotify: string;
  } | null>(null);

  const sectionGallery = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null); //- ギャラリーグリッド要素

  const detail = useRef<HTMLDivElement>(null); //- ダイアログ要素
  const detailBg = useRef<HTMLDivElement>(null); //- 詳細ダイアログ内 背景要素
  const detailImage = useRef<HTMLImageElement>(null); //- 詳細ダイアログ内 画像要素
  const detailContent = useRef<HTMLDivElement>(null); //- 詳細ダイアログ内 コンテンツ要素

  const clickedItem = useRef<HTMLElement | null>(null); //- クリックされたギャラリーアイテム

  // 詳細ダイアログ 表示処理
  const handleShowDetail = () => {
    if (!detailItem || !clickedItem.current || !detail.current) return;

    // クリックした画像の位置にダイアログ全体をフィット
    Flip.fit(detail.current, clickedItem.current, {
      scale: true,
      fitChild: detailImage.current,
    });

    // 現在の状態を記録
    const state = Flip.getState(detail.current);

    // 最終的な位置とスタイルを設定（画面全体に表示）
    gsap.set(detail.current, { clearProps: true });

    // アニメーション実行
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      scale: true,
      onStart: () => {
        // クリック要素 画像 非表示
        if (clickedItem.current) {
          clickedItem.current.style.opacity = "0";
        }
        // 背景をフェードイン
        if (detailBg.current) {
          gsap.to(detailBg.current, {
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onComplete: () => {
        gsap.to(detailContent.current, {
          clipPath: "polygon(0% 0%,  100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
        });
      },
    });
  };

  // 詳細ダイアログ 非表示処理
  const handleCloseDetail = () => {
    if (
      !detailItem ||
      !clickedItem.current ||
      !detailImage.current ||
      !detail.current
    )
      return;

    // 背景をフェードアウト
    const background = detailBg.current;
    if (background) {
      gsap.to(background, { opacity: 0, duration: 0.3 });
    }

    // コンテンツを閉じる
    gsap.to(detailContent.current, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      duration: 0.25,
      onComplete: () => {
        // コンテンツが閉じた後にダイアログ全体のアニメーション実行
        // 現在の状態を記録
        const state = Flip.getState(detail.current);

        // クリックされた要素の位置とサイズに設定
        Flip.fit(detail.current, clickedItem.current, {
          scale: true,
          fitChild: detailImage.current,
        });

        // アニメーション実行（現在の状態から小さい位置へ）
        Flip.from(state, {
          duration: 0.5,
          ease: "power2.inOut",
          scale: true,
          onComplete: () => {
            // クリック要素 画像 表示
            if (clickedItem.current) {
              clickedItem.current.style.opacity = "1";
            }
            // 詳細ダイアログ 初期化
            setDetailItem(null);
            clickedItem.current = null;
          },
        });
      },
    });
  };

  useEffect(() => {
    if (detailItem) {
      handleShowDetail();
    }
  }, [detailItem]);

  const galleryArray = [
    {
      img: "/images/about/gallery-01.jpg",
      title: "Live",
      artist: "Donny Hathaway",
      year: "1972",
      spotify: "",
    },
    {
      img: "/images/about/gallery-02.jpg",
      title: "Undercurrent",
      artist: "Bill Evans - Jim Hall",
      year: "1962",
      spotify: "",
    },
    {
      img: "/images/about/gallery-03.jpg",
      title: "Diana & Marvin",
      artist: "Diana Ross & Marvin Gaye",
      year: "1973",
      spotify: "",
    },
    {
      img: "/images/about/gallery-04.jpg",
      title: "Midnight Blue",
      artist: "Kenny Burrell",
      year: "1963",
      spotify: "",
    },
    {
      img: "/images/about/gallery-05.jpg",
      title: "夢飛行",
      artist: "山口美央子",
      year: "1980",
      spotify: "",
    },
    {
      img: "/images/about/gallery-06.jpg",
      title: "Gaucho",
      artist: "Steely Dan",
      year: "1980",
      spotify: "",
    },
    {
      img: "/images/about/gallery-07.jpg",
      title: "Dr. John's Gumbo",
      artist: "Dr. John",
      year: "1972",
      spotify: "",
    },
    {
      img: "/images/about/gallery-08.jpg",
      title: "Down Home",
      artist: "Zoot Sims",
      year: "1960",
      spotify: "",
    },
  ];

  return (
    <section ref={sectionGallery} id="section-gallery">
      <div ref={grid} className={cn("grid grid-cols-5")}>
        {galleryArray.map((item, index) => {
          return (
            <button
              key={index}
              className={cn("aspect-square w-full cursor-pointer")}
              onClick={(e) => {
                clickedItem.current = e.currentTarget as HTMLElement;
                setDetailItem(item);
                handleShowDetail();
              }}
            >
              <Image
                src={item.img}
                alt={item.title}
                height={400}
                width={400}
                className={cn("h-full w-full object-cover")}
              />
            </button>
          );
        })}
      </div>

      {/* 詳細ダイアログ */}
      {detailItem && (
        <div ref={detail} className={cn("fixed inset-0 z-50")}>
          {/* 削除用背景 */}
          <div
            ref={detailBg}
            className={cn("absolute inset-0 scale-0 bg-black/50")}
            onClick={() => {
              handleCloseDetail();
            }}
          ></div>

          {/* コンテンツ */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 grid h-[50%] w-[50%] -translate-1/2 grid-cols-[auto_1fr]"
            )}
          >
            <ButtonClose
              label="閉じる"
              handleClick={() => {
                handleCloseDetail();
              }}
              className="absolute -top-8 -right-8"
            />
            <figure className={cn("aspect-square w-full")}>
              <Image
                ref={detailImage}
                src={detailItem.img}
                alt={detailItem.title}
                height={400}
                width={400}
                className={cn("h-full w-full object-cover")}
              />
            </figure>
            <div
              ref={detailContent}
              className={cn(
                "bg-background rounded-r-md p-4 [clip-path:polygon(0_0,0_0,0_100%,0_100%)]"
              )}
            >
              <div className={cn("max-h-full overflow-y-auto")}>
                <p>{detailItem.title}</p>
                <p>{detailItem.year}</p>
                <p>{detailItem.artist}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionGallery;
