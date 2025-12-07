"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import type { Options } from "@splidejs/react-splide";
import type { Blog } from "@/app/types/common";
import CardBlog from "../card/card-blog";

import { cn } from "@/lib/utils";

type SplideCarouselProps = {
  blogs: Blog[];
  category: string;
};

const SplideCarousel = ({ blogs, category }: SplideCarouselProps) => {
  const options: Options = {
    type: "slide",
    gap: "1rem",
    perMove: 1,
    autoWidth: true,
    pagination: false,
    easing: "cubic-bezier(0.9, 0.03, 0.49, 1.02)",
    updateOnMove: true,
    speed: 700,
    flickPower: 300,
    omitEnd: true,
    drag: "free",
    snap: true,
    breakpoints: {
      768: {
        flickPower: 150,
      },
    },
  };

  const arrowCommonStyle = cn(
    "relative w-full aspect-square bg-contain bg-center h-auto bg-no-repeat bg-[url(/images/common/icon_arrow-right.svg)] inset-0 rounded-none bg-transparent transform-[revert]",
    "dark-filter-to-foreground",
    "disabled:pointer-events-none"
  );

  return (
    <Splide
      hasTrack={false}
      options={options}
      className={cn("relative w-full overflow-hidden pt-12", "splide-subgrid")}
      aria-labelledby="label-otherArticles"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <h3 className="text-xl font-bold" id="label-otherArticles">
          {`他の記事を読む - ${category}`}
        </h3>
        <div
          className={cn(
            "splide__arrows",
            "grid grid-cols-[repeat(2,2.625rem)] gap-x-4"
          )}
        >
          <button
            className={cn(
              "splide__arrow splide__arrow--prev",
              arrowCommonStyle,
              "scale-x-[-1]"
            )}
            aria-label="前へ"
          ></button>
          <button
            className={cn(
              "splide__arrow splide__arrow--next",
              arrowCommonStyle
            )}
            aria-label="次へ"
          ></button>
        </div>
      </div>

      <SplideTrack className="mt-8">
        {blogs.map((blog) => (
          <SplideSlide
            key={blog.id}
            className="row-span-4 grid grid-rows-subgrid"
          >
            <CardBlog
              blog={blog}
              className={cn("onFocus w-60 px-0", "md:w-80")}
            />
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  );
};

export default SplideCarousel;
