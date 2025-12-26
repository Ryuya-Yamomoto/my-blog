import Image from "next/image";

import { cn } from "@/lib/utils";

const SectionMv = () => {
  return (
    <section id="section-mv">
      <div className="relative h-lvh w-full" id="content-mv">
        <div className="absolute inset-0 z-3 h-lvh w-full">
          <figure className={cn("h-full w-full")}>
            <Image
              src="/images/about/mv_01.jpg"
              alt="MV"
              height={785}
              width={589}
              className={cn("h-full w-full object-cover")}
            />
          </figure>
        </div>

        <div className="absolute inset-0 z-2 h-lvh w-full">
          <figure className={cn("h-full w-full")}>
            <Image
              src="/images/about/mv_01.jpg"
              alt="MV"
              height={785}
              width={589}
              className={cn("h-full w-full object-cover")}
            />
          </figure>
        </div>

        <div className="absolute inset-0 z-1 h-lvh w-full">
          <figure className={cn("h-full w-full")}>
            <Image
              src="/images/about/mv_01.jpg"
              alt="MV"
              height={785}
              width={589}
              className={cn("h-full w-full object-cover")}
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default SectionMv;
