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

  useGSAP(() => {}, [{ scope: splideElement.current }]);

  return (
    <Splide
      ref={splideElement}
      extensions={{ AutoScroll }}
      id="section-tech"
      tag="section"
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
  );
};

export default SectionTech;
