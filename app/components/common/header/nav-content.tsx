import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category } from "@/app/types/common";

const NavContent = (props: {
  isNavigationOpen: boolean;
  handleIsNavigationOpen: () => void;
  categories: Category[];
  currentPathname: string;
}) => {
  const {
    isNavigationOpen,
    handleIsNavigationOpen,
    categories,
    currentPathname,
  } = props;

  return (
    <>
      <div
        className={cn(
          "transition-[background, backdrop-blur] pointer-events-none h-screen w-screen duration-600",
          isNavigationOpen
            ? "pointer-events-auto bg-black/50 backdrop-blur-sm"
            : ""
        )}
        onClick={handleIsNavigationOpen}
      ></div>
      <div
        className={cn(
          "bg-background fixed top-0 right-0 h-screen w-[80%] max-w-80 px-4 pt-28 pb-4 md:shadow-lg",
          isNavigationOpen
            ? "[clip-path:inset(0_0_0_-10%)]"
            : "[clip-path:inset(0_0_0_100%)]",
          "transition-clip-path duration-400 ease-(--easing)"
        )}
      >
        <div className="h-full w-full overflow-y-auto">
          <ul className="grid gap-y-4">
            <li>
              <MenuLink pathname={currentPathname} slug="all" />
            </li>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <MenuLink pathname={currentPathname} slug={category.slug} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const MenuLink = ({ pathname, slug }: { pathname: string; slug: string }) => {
  const linkStyle = cn(
    "text-primary relative block w-fit text-xl leading-normal font-bold uppercase"
  );

  if (slug === "all" && pathname === "/blog") {
    return (
      <span className={cn(linkStyle, "before:content-['・']")}>{slug}</span>
    );
  } else if (pathname === `/blog/${slug}`) {
    return (
      <span className={cn(linkStyle, "before:content-['・']")}>{slug}</span>
    );
  } else {
    return (
      <Link
        href={`/blog${slug === "all" ? "" : `/${slug}`}`}
        className={cn(
          linkStyle,
          'before:bg-primary before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:content-[""]',
          "hover:before:origin-left hover:before:scale-x-100"
        )}
      >
        {slug}
      </Link>
    );
  }
};

export default NavContent;
