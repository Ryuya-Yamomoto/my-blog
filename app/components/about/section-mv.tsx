"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const SectionMv = () => {
  const sectionMv = useRef<HTMLElement>(null);
  const img01 = useRef<HTMLDivElement>(null);
  const img02 = useRef<HTMLDivElement>(null);
  const img03 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !sectionMv.current ||
      !img01.current ||
      !img02.current ||
      !img03.current
    )
      return;

    // img01のScrollTrigger
    gsap.to(img01.current.querySelector("img"), {
      y: -200,
      scrollTrigger: {
        trigger: img01.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".overlay_01 .slit", {
      scaleY: 1,
      stagger: {
        each: 0.2,
        from: "end",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: img01.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // img02のScrollTrigger
    gsap.to(img02.current.querySelector("img"), {
      y: -200,
      scrollTrigger: {
        trigger: img02.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".overlay_02 .slit", {
      scaleY: 1,
      stagger: {
        each: 0.2,
        from: "end",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: img02.current,
        start: "top 30%",
        end: "bottom top",
        scrub: true,
      },
    });

    // img03のScrollTrigger
    gsap.to(img03.current.querySelector("img"), {
      y: -200,
      scrollTrigger: {
        trigger: img03.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".overlay_03 .slit", {
      scaleY: 1,
      stagger: {
        each: 0.2,
        from: "end",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: img03.current,
        start: "top 30%",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [{ scope: sectionMv }]);

  return (
    <section ref={sectionMv} id="section-mv" className="">
      <div className="" id="content-mv">
        {/* 画像 1枚目 */}
        <div ref={img01} className="relative h-svh w-full [clip-path:inset(0)]">
          <Overlay className="overlay_01" />
          <figure className={cn("fixed inset-0 overflow-hidden")}>
            <Image
              src="/images/about/mv_01.jpg"
              alt="MV"
              height={785}
              width={589}
              className={cn("h-full w-full origin-top scale-140 object-cover")}
            />
          </figure>
        </div>

        {/* 画像 2枚目 */}
        <div
          ref={img02}
          className="relative h-[70svh] w-full [clip-path:inset(0)]"
        >
          <Overlay className="overlay_02" />
          <figure className={cn("fixed inset-0 overflow-hidden")}>
            <Image
              src="/images/about/mv_02.jpg"
              alt="MV"
              height={785}
              width={589}
              className={cn("h-full w-full origin-top scale-140 object-cover")}
            />
          </figure>
        </div>

        {/* 画像 3枚目 */}
        <div
          ref={img03}
          className="relative h-[70svh] w-full [clip-path:inset(0)]"
        >
          <Overlay className="overlay_03" />
          <figure className={cn("fixed inset-0 overflow-hidden")}>
            <Image
              src="/images/about/mv_03.jpg"
              alt="MV"
              height={785}
              width={589}
              className={cn("h-full w-full origin-top scale-140 object-cover")}
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

// 画像上のオーバーレイ要素
const Overlay = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "overlay-container",
        "fixed inset-0 z-1 grid grid-rows-17",
        className
      )}
    >
      {Array.from({ length: 17 }, (_, index) => (
        <div
          key={index}
          className={cn("slit", "origin-center scale-y-0 bg-black")}
        />
      ))}
    </div>
  );
};

export default SectionMv;
