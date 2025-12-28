import { cn } from "@/lib/utils";

import Image from "next/image";

const SectionAttitude = () => {
  return (
    <section id="section-attitude" className={cn("relative h-[200svh] w-full")}>
      <div
        className={cn(
          "sticky top-0",
          "grid h-svh w-full grid-cols-[1fr_1.4fr_1fr] grid-rows-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] gap-4"
        )}
      >
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_01.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_02.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_03.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_04.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
        <div className="bg-black"></div>
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_06.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_07.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_08.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
        <figure className={cn("h-full w-full")}>
          <Image
            src="/images/about/attitude_img_09.jpg"
            alt=""
            height={450}
            width={450}
            className="h-full w-full object-cover filter-[grayscale(1)]"
          />
        </figure>
      </div>
    </section>
  );
};

export default SectionAttitude;
