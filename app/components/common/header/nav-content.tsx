import Link from "next/link";
import { cn } from "@/lib/utils";

const NavContent = (props: {
  isNavigationOpen: boolean;
  handleIsNavigationOpen: () => void;
}) => {
  const { isNavigationOpen, handleIsNavigationOpen } = props;

  const list = [
    {
      label: "ABOUT",
      href: "/about",
      blank: false,
    },
    {
      label: "TECH",
      href: "/articles/tech",
      blank: false,
    },
    {
      label: "MUSIC",
      href: "/articles/music",
      blank: false,
    },
  ];

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
          "bg-background fixed top-0 right-0 h-screen w-[80%] max-w-80 px-4 pt-28 pb-4 shadow-lg",
          isNavigationOpen
            ? "[clip-path:inset(0_0_0_-10%)]"
            : "[clip-path:inset(0_0_0_100%)]",
          "transition-clip-path duration-300"
        )}
      >
        <div className="h-full w-full overflow-y-auto">
          <ul className="grid gap-y-4">
            {list.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    target={item.blank ? "_blank" : ""}
                    rel={item.blank ? "noopener" : ""}
                    className={cn(
                      "text-primary relative block w-fit text-xl leading-normal font-bold",
                      'before:bg-primary before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:content-[""]',
                      "hover:before:origin-left hover:before:scale-x-100"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavContent;
