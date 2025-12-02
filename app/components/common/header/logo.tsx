import { cn } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <h1 className={cn("relative z-1 w-36", "md:w-56")}>
      <Link href="/" className="onFocus block w-full">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/common/logo.svg" />
          <Image
            src="/images/common/logo_sp.svg"
            alt="RYUYA YAMAMOTO"
            width={200}
            height={200}
            priority
            className="dark-filter-to-foreground h-auto w-full"
          />
        </picture>
      </Link>
    </h1>
  );
};

export default Logo;
