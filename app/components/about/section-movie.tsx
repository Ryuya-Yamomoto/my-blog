"use client";

import { cn } from "@/lib/utils";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const SectionMovie = () => {
  const sectionMovie = useRef<HTMLElement>(null);
  const mask = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionMovie.current || !mask.current) return;

    mask.current.querySelectorAll(".maskRow").forEach((row, index) => {
      gsap.to(row, {
        x: index % 2 === 0 ? "-5%" : "5%", // 奇数番目は50%、偶数番目は-50%
        scrollTrigger: {
          trigger: sectionMovie.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  return (
    <section
      ref={sectionMovie}
      id="section-movie"
      className="h-[60lvh] [clip-path:inset(0)]"
    >
      <div className="fixed inset-0 overflow-clip">
        <figure
          className={cn(
            "relative h-full w-full overflow-clip",
            "before:absolute before:inset-0 before:z-1 before:bg-[url(/images/common/noise.png)] before:bg-size-[100px] before:bg-repeat before:opacity-25 before:content-['']"
          )}
        >
          <video
            width="320"
            height="240"
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="none"
            disablePictureInPicture
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            style={{
              WebkitUserSelect: "none",
              userSelect: "none",
              outline: "none",
            }}
            className={cn(
              "pointer-events-none h-full w-full object-cover object-[50%_70%] filter-[grayscale(1)]",
              "[&::-webkit-media-controls]:hidden [&::-webkit-media-controls-enclosure]:hidden [&::-webkit-media-controls-panel]:hidden"
            )}
          >
            <source src="/videos/about/video.mp4" type="video/mp4" />
          </video>
        </figure>
        <div
          ref={mask}
          className={cn("absolute inset-0 z-10 grid grid-rows-3 overflow-clip")}
        >
          <div
            className={cn(
              "maskRow",
              "h-full w-[200vw]",
              "bg-background/70 mask-[linear-gradient(#000,#000),url(/images/common/favicon.svg)] mask-intersect mask-size-[100%,auto_100%] mask-position-[0_0,center_center] mask-repeat-x"
            )}
          />
          <div
            className={cn(
              "maskRow",
              "h-full w-[200vw] -translate-x-1/2",
              "bg-background/70 mask-[linear-gradient(#000,#000),url(/images/common/favicon.svg)] mask-intersect mask-size-[100%,auto_100%] mask-position-[0_0,center_center] mask-repeat-x"
            )}
          />
          <div
            className={cn(
              "maskRow",
              "h-full w-[200vw]",
              "bg-background/70 mask-[linear-gradient(#000,#000),url(/images/common/favicon.svg)] mask-intersect mask-size-[100%,auto_100%] mask-position-[0_0,center_center] mask-repeat-x"
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionMovie;
