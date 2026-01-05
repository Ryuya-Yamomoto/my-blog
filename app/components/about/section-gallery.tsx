"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Flip);

const SectionGallery = () => {
  const [detailItem, setDetailItem] = useState<{
    img: string;
    title: string;
    artist: string;
    spotify: string;
  } | null>(null);

  const sectionGallery = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const detail = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionGallery.current || !grid.current) return;

    // 詳細ダイアログを展開する処理
    const showDetails = (item: HTMLElement) => {
      const onLoad = () => {
        Flip.fit(detail.current, item, {
          scale: true,
          fitChild: detail.current?.querySelector("img"),
        });

        const state = Flip.getState(detail.current);

        gsap.set(detail.current, { clearProps: true });
        gsap.set(detail.current, {
          xPercent: -50,
          top: "50%",
          yPercent: -50,
          visibility: "visible",
          overflow: "hidden",
        });

        Flip.from(state, {
          duration: 0.5,
          ease: "power2.inOut",
          scale: true,
        });
      };

      console.log("クリック");

      // 詳細情報をstateにセット
      setDetailItem({
        img: item.dataset.img || "",
        title: item.dataset.title || "",
        artist: item.dataset.artist || "",
        spotify: item.dataset.spotify || "",
      });
    };

    gsap.utils
      .toArray(grid.current.querySelectorAll("figure"))
      .forEach((item) =>
        item.addEventListener("click", () => showDetails(item as HTMLElement))
      );
  }, [{ scope: sectionGallery }]);

  const galleryArray = [
    {
      img: "/images/about/gallery-01.jpg",
      title: "Live",
      artist: "Donny Hathaway",
      spotify: "",
    },
    {
      img: "/images/about/gallery-02.jpg",
      title: "Undercurrent",
      artist: "Bill Evans - Jim Hall",
      spotify: "",
    },
    {
      img: "/images/about/gallery-03.jpg",
      title: "Undercurrent",
      artist: "Bill Evans - Jim Hall",
      spotify: "",
    },
    {
      img: "/images/about/gallery-04.jpg",
      title: "Midnight Blue",
      artist: "Kenny Burrell",
      spotify: "",
    },
    {
      img: "/images/about/gallery-05.jpg",
      title: "夢飛行",
      artist: "山口美央子",
      spotify: "",
    },
    {
      img: "/images/about/gallery-06.jpg",
      title: "Gaucho",
      artist: "Steely Dan",
      spotify: "",
    },
    {
      img: "/images/about/gallery-07.jpg",
      title: "Dr. John's Gumbo",
      artist: "Dr. John",
      spotify: "",
    },
    {
      img: "/images/about/gallery-08.jpg",
      title: "Down Home",
      artist: "Zoot Sims",
      spotify: "",
    },
  ];

  return (
    <section ref={sectionGallery} id="section-gallery">
      <div ref={grid} className={cn("grid grid-cols-4")}>
        {galleryArray.map((item, index) => {
          return (
            <figure
              key={index}
              className={cn("aspect-square w-full")}
              data-title={item.title}
              data-artist={item.artist}
              data-spotify={item.spotify}
              data-img={item.img}
            >
              <Image
                src={item.img}
                alt={item.title}
                height={400}
                width={400}
                className={cn("h-full w-full object-cover")}
              />
            </figure>
          );
        })}
      </div>

      {/* 詳細ダイアログ */}
      {detailItem && (
        <div ref={detail} className={cn("")}>
          <figure>
            <Image
              src={detailItem.img}
              alt={detailItem.title}
              height={400}
              width={400}
            />
          </figure>
          <div>
            <p>{detailItem.title}</p>
            <p>{detailItem.artist}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionGallery;
