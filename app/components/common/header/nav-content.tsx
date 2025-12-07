import type { Category } from "@/app/types/common";

import Image from "next/image";
import Link from "next/link";
import ButtonTheme from "./button-theme";

import { cn } from "@/lib/utils";

type NavContentProps = {
  categories: Category[];
  currentPathname: string;
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
};

const NavContent = (props: NavContentProps) => {
  const { categories, currentPathname, isOpen, handleOpen } = props;

  return (
    <>
      <div
        className={cn(
          "transition-[background, backdrop-blur] pointer-events-none absolute h-screen w-screen duration-600",
          isOpen
            ? "pointer-events-auto relative bg-black/50 backdrop-blur-sm"
            : ""
        )}
        onClick={() => handleOpen(!isOpen)}
      ></div>
      <div
        className={cn(
          "bg-background fixed top-0 right-0 h-svh w-[80%] max-w-80 px-4 pt-28 pb-10 md:shadow-lg",
          isOpen
            ? "[clip-path:inset(0_0_0_-10%)]"
            : "[clip-path:inset(0_0_0_100%)]",
          "transition-clip-path duration-400 ease-(--easing)"
        )}
      >
        <div className="h-full w-full overflow-y-auto" data-lenis-prevent>
          <ul className="grid gap-y-4">
            <li>
              <MenuLink
                currentPathname={currentPathname}
                matchPath="/blog"
                slug="all"
                isOpen={isOpen}
              />
            </li>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <MenuLink
                    currentPathname={currentPathname}
                    matchPath={`/blog/category/${category.slug}`}
                    slug={category.slug}
                    isOpen={isOpen}
                  />
                </li>
              );
            })}
            <li>
              <MenuLink
                currentPathname={currentPathname}
                matchPath="/contact"
                slug="contact"
                isOpen={isOpen}
              />
            </li>
          </ul>
          <div className="mt-16 w-full border-t px-2 pt-8">
            <ul className="flex flex-wrap items-baseline gap-x-4">
              <li>
                <Link
                  href="https://x.com/ryu_yama_0325"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative outline-none",
                    "before:background before:absolute before:-inset-1 before:rounded-sm before:bg-transparent before:duration-300 before:content-['']",
                    "hover:before:bg-foreground/10",
                    "focus:before:bg-foreground/10"
                  )}
                  tabIndex={isOpen ? 0 : -1}
                  aria-disabled={!isOpen}
                >
                  <Image
                    src="/images/common/logo_x.svg"
                    alt="X Logo"
                    width={24}
                    height={24}
                    className="dark-filter-to-foreground"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <ButtonTheme disabled={!isOpen} />
      </div>
    </>
  );
};

const MenuLink = ({
  currentPathname,
  matchPath,
  slug,
  isOpen,
}: {
  currentPathname: string;
  matchPath: string;
  slug: string;
  isOpen: boolean;
}) => {
  const linkStyle = cn(
    "text-foreground relative block w-fit text-lg leading-normal  uppercase outline-none",
    'after:bg-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-300 after:content-[""]'
  );

  if (currentPathname === matchPath) {
    return (
      <span className={cn(linkStyle, "before:content-['・']")}>{slug}</span>
    );
  } else {
    return (
      <Link
        href={matchPath}
        className={cn(
          linkStyle,
          "hover:after:origin-left hover:after:scale-x-100",
          "focus:after:origin-left focus:after:scale-x-100"
        )}
        tabIndex={isOpen ? 0 : -1}
        aria-disabled={!isOpen}
      >
        {slug}
      </Link>
    );
  }
};

export default NavContent;
