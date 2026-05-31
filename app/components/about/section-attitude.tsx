"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useRef, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const SectionAttitude = () => {
  const sectionAttitude = useRef<HTMLElement>(null);

  const section_01_trigger = useRef<HTMLDivElement>(null);
  const section_02_trigger = useRef<HTMLDivElement>(null);

  const section_01_target = useRef<HTMLDivElement>(null);
  const section_02_target = useRef<HTMLDivElement>(null);

  const section_03 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !sectionAttitude.current ||
      !section_01_target.current ||
      !section_02_target.current ||
      !section_03.current
    )
      return;

    // Section03 アニメーション
    gsap.to(section_03.current.querySelector(".content_01"), {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: section_03.current.querySelector(".content_01"),
        start: "top bottom",
        end: "top 25%",
        scrub: true,
      },
    });
    gsap.to(section_03.current.querySelector(".content_02"), {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: section_03.current.querySelector(".content_02"),
        start: "top bottom",
        end: "top 25%",
        scrub: true,
      },
    });

    // Section02 アニメーション
    gsap.to(section_02_target.current.querySelector("h2"), {
      opacity: 0.5,
      fontSize: "4rem",
      scrollTrigger: {
        trigger: section_02_trigger.current,
        start: "top 150%",
        end: "top top",
        scrub: true,
      },
    });
    gsap.to(section_02_target.current.querySelectorAll("span"), {
      scaleY: 10,
      scaleX: 0.5,
      filter: "blur(10px)",
      opacity: 0,
      stagger: {
        each: 0.05,
        from: "center",
      },
      scrollTrigger: {
        trigger: section_02_trigger.current,
        start: "top bottom",
        end: "bottom center",
        scrub: true,
      },
    });

    // Section01 アニメーション
    gsap.to(section_01_target.current, {
      scale: 5,
      scrollTrigger: {
        trigger: section_01_trigger.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onLeave: () => {
          gsap.set(section_01_target.current, { visibility: "hidden" });
        },
        onEnterBack: () => {
          gsap.set(section_01_target.current, { visibility: "visible" });
        },
      },
    });
    gsap.to(section_01_target.current.querySelectorAll("img"), {
      y: -40,
      scrollTrigger: {
        trigger: sectionAttitude.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [{ scope: sectionAttitude }]);

  return (
    <section
      id="section-attitude"
      ref={sectionAttitude}
      className={cn("relative w-full overflow-clip")}
    >
      {/* コンテンツ */}
      <div className="sticky top-0 z-10 h-svh w-full">
        <Section01 ref={section_01_target} />
        <Section02 ref={section_02_target} />
      </div>

      {/* トリガー */}
      <div ref={section_01_trigger} className="h-svh" />
      <div ref={section_02_trigger} className="h-svh" />

      {/* 固定の次のコンテンツ */}
      <Section03 ref={section_03} />
    </section>
  );
};

const Section03 = forwardRef<HTMLDivElement>((_, ref) => {
  const attitudeArray = [
    {
      title: "コミュニケーション",
      text: "会話を大切にして、同じ方向を向いていきます。",
    },
    {
      title: "常に学ぶ姿勢",
      text: "変化の激しい業界だからこそ、キャッチアップの心を忘れません。",
    },
    {
      title: "広い視野",
      text: "自分一人で終わる仕事はそうありません。同じよりよい成果を目指すチームとして、自分の役割、前後の仕事の流れを意識して制作します。",
    },
    {
      title: "遊び心",
      text: "堅苦しいだけではなく、楽しむ心を忘れずに仕事に取り組みます。心の余裕、豊かさからよりよいものが生まれると信じています。",
    },
  ];

  const profileArray = [
    {
      title: "職種",
      text: "フロントエンドエンジニア",
    },
    {
      title: "技術スタック",
      text: "HTML, CSS, JavaScript, TypeScript, React, Next.js, GSAP, Tailwind CSS ...etc.",
    },
    {
      title: "好きなこと",
      text: "映画、音楽、テニス、散歩",
    },
    {
      title: "性格",
      text: "おしゃべり",
    },
    {
      title: "好きな食べ物",
      text: "から揚げ",
    },
  ];

  return (
    <div
      ref={ref}
      className="relative z-10 pt-[150lvh] pb-[100lvh] [clip-path:inset(0)]"
    >
      <div className={"fixed inset-0 -z-1 grid place-items-center"}>
        <figure
          className={cn(
            "bg",
            "aspect-video w-full origin-top filter-[grayscale(1)]",
            "md:w-1/3"
          )}
        >
          <Image
            src="/images/about/attitude_bg.jpg"
            alt=""
            height={500}
            width={500}
            className={cn("pointer-events-none h-full w-full object-cover")}
            priority
          />
        </figure>
      </div>

      <div
        className={cn(
          "content_01",
          "bg-background/90 relative z-1 mx-auto w-[80%] max-w-100 rounded-sm px-4 py-10 backdrop-blur-sm [clip-path:polygon(50%_0,50%_0,50%_100%,50%_100%)]"
        )}
      >
        <h2
          className={cn(
            "relative text-lg font-normal",
            "before:bg-foreground before:absolute before:-bottom-4 before:left-0 before:h-px before:w-3 before:content-['']"
          )}
        >
          自己紹介
        </h2>
        <ul className="mt-16 grid gap-y-12 text-sm">
          {profileArray.map((item, index) => (
            <li key={index} className="grid gap-y-2">
              <p>{item.title}</p>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "content_02",
          "bg-background/90 relative z-1 mx-auto mt-16 w-[80%] max-w-100 rounded-sm px-4 py-10 backdrop-blur-sm [clip-path:polygon(50%_0,50%_0,50%_100%,50%_100%)]"
        )}
      >
        <h2
          className={cn(
            "relative text-lg font-normal",
            "before:bg-foreground before:absolute before:-bottom-4 before:left-0 before:h-px before:w-3 before:content-['']"
          )}
        >
          大切にしていること
        </h2>
        <ul className="mt-16 grid gap-y-12 text-sm">
          {attitudeArray.map((item, index) => (
            <li key={index} className="grid gap-y-2">
              <p>{item.title}</p>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
Section03.displayName = "Section03";

const Section02 = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 grid shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
      )}
    >
      <h2 className="font-inter pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-normal whitespace-nowrap">
        <span className="inline-block">A</span>
        <span className="inline-block">B</span>
        <span className="inline-block">O</span>
        <span className="inline-block">U</span>
        <span className="inline-block">T</span>
        <span className="inline-block">M</span>
        <span className="inline-block">E</span>
      </h2>
    </div>
  );
});
Section02.displayName = "Section02";

const Section01 = forwardRef<HTMLDivElement>((_, ref) => {
  const gridArray = [
    {
      pos: "area01",
      img: "attitude_img_01.jpg",
    },
    {
      pos: "area02",
      img: "attitude_img_02.jpg",
    },
    {
      pos: "area03",
      img: "attitude_img_03.jpg",
    },
    {
      pos: "area04",
      img: "attitude_img_04.jpg",
    },
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 z-10",
        "pointer-events-none grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-1 [grid-template-areas:'area01_area02_area02'_'area01_center_area03'_'area04_area04_area03']",
        "md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.4fr)] md:grid-rows-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)]"
      )}
    >
      {gridArray.map((item, index) => {
        return (
          <figure
            key={index}
            className={cn("h-full w-full overflow-clip")}
            style={{
              gridArea: item.pos,
            }}
          >
            <Image
              src={`/images/about/${item.img}`}
              alt=""
              height={450}
              width={450}
              className={cn(
                "object-top-center h-full w-full translate-y-10 scale-140 object-cover filter-[grayscale(1)]"
              )}
            />
          </figure>
        );
      })}
      <div className="bg-transparent shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] [grid-area:center]"></div>
    </div>
  );
});
Section01.displayName = "Section01";

export default SectionAttitude;
