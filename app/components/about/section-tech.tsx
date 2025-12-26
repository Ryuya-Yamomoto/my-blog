import { cn } from "@/lib/utils";

import Image from "next/image";
import WrapperContent from "../common/wrapper/wrapper-content";

const SectionTech = () => {
  return (
    <section id="section-tech">
      <WrapperContent>
        <h2>
          <span>T</span>
          <span>E</span>
          <span>C</span>
          <span>H</span>

          <span className={cn("ml-1")}>S</span>
          <span>T</span>
          <span>A</span>
          <span>C</span>
          <span>K</span>
        </h2>

        <ul>
          <li>
            <figure className="relative h-24 w-full">
              <Image
                src="/images/about/logo_html.svg"
                alt=""
                width={100}
                height={100}
                className="left-50% absolute top-0 h-full w-auto -translate-x-1/2 filter-[grayscale(1)]"
              />
              <Image
                src="/images/about/logo_html.svg"
                alt="ロゴ html"
                width={100}
                height={100}
                className="left-50% absolute top-0 h-full w-auto -translate-x-1/2 [clip-path:polygon(50%_0,100%_0,100%_100%,50%_100%)]"
              />
            </figure>
          </li>
        </ul>
      </WrapperContent>
    </section>
  );
};

export default SectionTech;
