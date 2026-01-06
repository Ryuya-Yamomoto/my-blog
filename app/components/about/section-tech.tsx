"use client";

import { cn } from "@/lib/utils";

import Image from "next/image";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import type { Options } from "@splidejs/react-splide";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const SectionTech = () => {
  const sectionTech = useRef<HTMLElement>(null);
  const bgText = useRef<HTMLParagraphElement>(null);
  const splideElement = useRef<Splide>(null);

  const options: Options = {
    type: "loop",
    gap: "3rem",
    fixedHeight: "4rem",
    autoWidth: true,
    drag: "free",
    pagination: false,
    arrows: false,
    focus: "center",
    trimSpace: false,
    clones: 10,
    autoScroll: {
      speed: 0.5,
      pauseOnHover: false,
      pauseOnFocus: false,
    },
    intersection: {
      inView: {
        autoScroll: true,
      },
      outView: {
        autoScroll: false,
      },
    },
  };

  useGSAP(() => {
    if (!sectionTech.current || !bgText.current) return;

    gsap.to(bgText.current, {
      x: "50vw",
      scrollTrigger: {
        trigger: sectionTech.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [{ scope: sectionTech.current }]);

  return (
    <section
      className="relative shadow-[inset_0_20px_30px_-10px_rgba(0,0,0,0.3),inset_0_-20px_30px_-10px_rgba(0,0,0,0.3)]"
      id="section-tech"
      ref={sectionTech}
    >
      <p
        ref={bgText}
        className="font-inter absolute top-1/2 left-0 flex -translate-x-1/5 -translate-y-1/2 gap-x-1 text-7xl opacity-10"
      >
        <span className="whitespace-nowrap">TECH STACK FRONTEND</span>
      </p>
      <Splide
        ref={splideElement}
        extensions={{ AutoScroll }}
        hasTrack={false}
        options={options}
        className={cn("w-full py-20")}
      >
        <SplideTrack>
          <SplideSlide>
            <figure className="h-full w-auto">
              <Image
                src="/images/about/logo_html.svg"
                alt="ロゴ HTML"
                height={100}
                width={100}
                className="h-full w-auto dark:filter-[invert(1)]"
              />
            </figure>
          </SplideSlide>
          <SplideSlide>
            <figure className="h-full w-auto">
              <Image
                src="/images/about/logo_css.svg"
                alt="ロゴ CSS"
                height={100}
                width={100}
                className="h-full w-auto dark:filter-[invert(1)]"
              />
            </figure>
          </SplideSlide>
          <SplideSlide>
            <figure className="h-full w-auto">
              <Image
                src="/images/about/logo_ts.svg"
                alt="ロゴ TypeScript"
                height={100}
                width={100}
                className="h-full w-auto"
              />
            </figure>
          </SplideSlide>
          <SplideSlide>
            <figure className="h-full w-auto">
              <Image
                src="/images/about/logo_react.svg"
                alt="ロゴ React"
                height={100}
                width={100}
                className="h-full w-auto"
              />
            </figure>
          </SplideSlide>
          <SplideSlide>
            <figure className="h-full w-auto">
              <Image
                src="/images/about/logo_next.svg"
                alt="ロゴ Next.js"
                height={100}
                width={100}
                className="h-full w-auto dark:filter-[invert(1)]"
              />
            </figure>
          </SplideSlide>
        </SplideTrack>
      </Splide>
    </section>
  );
};

export default SectionTech;
