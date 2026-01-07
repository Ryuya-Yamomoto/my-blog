"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/all";
import ButtonClose from "../common/button/button-close";

import { useScrollLock } from "@/app/hooks/useScrollLock";
import useStore from "@/app/store/useStore";

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

  const isLargeScreen = useStore((state) => state.isLargeScreen);

  const sectionGallery = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null); //- ギャラリーグリッド要素

  const dialogRef = useRef<HTMLDialogElement>(null); //- ダイアログ要素
  const detailImage = useRef<HTMLImageElement>(null); //- 詳細ダイアログ内 画像要素
  const detailContent = useRef<HTMLDivElement>(null); //- 詳細ダイアログ内 コンテンツ要素

  const clickedItem = useRef<HTMLElement | null>(null); //- クリックされたギャラリーアイテム

  // 詳細ダイアログ 表示処理
  const handleShowDetail = () => {
    // ダイアログを表示
    dialogRef.current?.showModal();

    // クリックした画像の位置にダイアログ全体をフィット
    Flip.fit(dialogRef.current, clickedItem.current, {
      scale: true,
      fitChild: detailImage.current,
    });

    // 現在の状態を記録
    const state = Flip.getState(dialogRef.current);

    // 最終的な位置とスタイルを設定（画面全体に表示）
    gsap.set(dialogRef.current, { clearProps: true });
    gsap.set(dialogRef.current, { display: "grid" });

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
      },
      onComplete: () => {
        gsap.to(detailContent.current, {
          clipPath: "polygon(0% 0%,  100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
        });

        // close-buttonを表示
        const closeButton = dialogRef.current?.querySelector("#close-button");
        if (closeButton) {
          gsap.to(closeButton, {
            visibility: "visible",
          });
        }
      },
    });
  };

  // 詳細ダイアログ 非表示処理
  const handleCloseDetail = () => {
    // ウィンドウ幅に応じて clipPath を変更
    const closeClipPath = isLargeScreen
      ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" // 1024px以上: 左から閉じる
      : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"; // 1024px未満: 上から閉じる

    // コンテンツを閉じる
    gsap.to(detailContent.current, {
      clipPath: closeClipPath,
      duration: 0.25,
      onStart: () => {
        const closeButton = dialogRef.current?.querySelector("#close-button");
        if (closeButton) {
          closeButton.setAttribute("style", "visibility: hidden");
        }
      },
      onComplete: () => {
        // コンテンツが閉じた後にダイアログ全体のアニメーション実行
        // 現在の状態を記録
        const state = Flip.getState(dialogRef.current);

        // クリックされた要素の位置とサイズに設定
        Flip.fit(dialogRef.current, clickedItem.current, {
          scale: true,
          fitChild: detailImage.current!,
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

            // ダイアログを閉じる
            if (dialogRef.current?.open) {
              dialogRef.current.close();
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
      // DOM のレンダリングが完了するまで待つ
      requestAnimationFrame(() => {
        handleShowDetail();
      });
    }
  }, [detailItem]);

  // スクロールロック
  useScrollLock({ isLocked: detailItem !== null });

  const galleryArray = [
    {
      img: "/images/about/gallery-01.jpg",
      title: "Live",
      artist: "Donny Hathaway",
      year: "1972",
      spotify: "0csi6eQolki4PIS60tBCW5",
    },
    {
      img: "/images/about/gallery-02.jpg",
      title: "Undercurrent",
      artist: "Bill Evans - Jim Hall",
      year: "1962",
      spotify: "3b2s2A8DPISbaQNxhrEsGQ",
    },
    {
      img: "/images/about/gallery-03.jpg",
      title: "Diana & Marvin",
      artist: "Diana Ross & Marvin Gaye",
      year: "1973",
      spotify: "1jbl32APgmqzDulRIqLQwC",
    },
    {
      img: "/images/about/gallery-04.jpg",
      title: "Midnight Blue",
      artist: "Kenny Burrell",
      year: "1963",
      spotify: "0hMuKAciHKinu4L3R4Ojjl",
    },
    {
      img: "/images/about/gallery-05.jpg",
      title: "夢飛行",
      artist: "山口美央子",
      year: "1980",
      spotify: "5tNqVkUqjHt1Da8E2ArndS",
    },
    {
      img: "/images/about/gallery-06.jpg",
      title: "Gaucho",
      artist: "Steely Dan",
      year: "1980",
      spotify: "6FRN2BwvClQEMsG2I4Cofb",
    },
    {
      img: "/images/about/gallery-07.jpg",
      title: "Dr. John's Gumbo",
      artist: "Dr. John",
      year: "1972",
      spotify: "15jDv2HgLoilWgd4KWaLQn",
    },
    {
      img: "/images/about/gallery-08.jpg",
      title: "Night Lights",
      artist: "Gerry Mulligan",
      year: "1963",
      spotify: "1uJ9OJIgmgj4ta8xjq9nEJ",
    },
    {
      img: "/images/about/gallery-09.jpg",
      title: "Mud Slide Slim And The Blue Horizon",
      artist: "James Taylor",
      year: "1971",
      spotify: "3ahHxtwRwMIdHcAo0MEXxX",
    },
    {
      img: "/images/about/gallery-10.jpg",
      title: "Live In Living '07",
      artist: "羊毛とおはな",
      year: "2007",
      spotify: "4PNQama0R1BqZGzOyCwrFi",
    },
  ];

  return (
    <section ref={sectionGallery} id="section-gallery">
      <div ref={grid} className={cn("grid grid-cols-2", "md:grid-cols-5")}>
        {galleryArray.map((item, index) => {
          return (
            <button
              key={index}
              className={cn("aspect-square w-full cursor-pointer")}
              onClick={(e) => {
                clickedItem.current = e.currentTarget as HTMLElement;
                setDetailItem(item);
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
      <dialog
        ref={dialogRef}
        onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
          if (e.target === e.currentTarget) {
            handleCloseDetail();
          }
        }}
        className={cn(
          "m-auto h-auto max-h-[80%] w-auto max-w-[80%] place-items-center bg-transparent outline-none",
          "backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        )}
      >
        <div
          className={cn(
            "grid h-full w-full",
            "lg:h-fit lg:grid-cols-[auto_1fr]"
          )}
          data-lenis-prevent
        >
          {detailItem && (
            <>
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
                  "bg-background overflow-clip rounded-r-md p-4 [clip-path:polygon(0_0,100%_0,100%_0,0_0)]",
                  "lg:[clip-path:polygon(0_0,0_0,0_100%,0_100%)]"
                )}
              >
                <div
                  className={cn("max-h-full overflow-y-auto")}
                  data-lenis-prevent
                >
                  <p className="text-lg">{detailItem.title}</p>
                  <p className="mt-2 text-sm">{detailItem.year}</p>
                  <p className="mt-2 text-sm">{detailItem.artist}</p>
                  <div className="mt-8 h-[352px]">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: "12px" }}
                      src={`https://open.spotify.com/embed/album/${detailItem.spotify}?utm_source=generator&theme=0`}
                      width="100%"
                      height="100%"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      data-lenis-prevent
                    ></iframe>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <ButtonClose
          id="close-button"
          label="閉じる"
          handleClick={() => {
            handleCloseDetail();
          }}
          className={cn("fixed top-4 right-4 hidden", "md:block")}
          style={{ visibility: "hidden" }}
        />
      </dialog>
    </section>
  );
};

export default SectionGallery;
