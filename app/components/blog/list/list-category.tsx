import type { Category } from "@/app/types/common";

import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  categories: Category[];
  currentCategory?: string;
  className?: string;
};

const ListCategory = ({ categories, currentCategory, className }: Props) => {
  const styleActive =
    "bg-foreground text-sm rounded-sm px-4 py-1 font-medium text-foreground-invert hover:[anchor-name:--cover] min-h-full inline-grid items-center";
  const styleNotActive =
    "px-4 py-1 hover:[anchor-name:--cover] focus:[anchor-name:--cover] inline-grid text-sm rounded";

  return (
    <div
      className={cn(
        "grid items-center gap-x-4 gap-y-2",
        "md:grid-cols-[auto_1fr] md:gap-y-0",
        className
      )}
    >
      <p className="text-lg font-bold">カテゴリ：</p>
      <ul
        className={cn(
          "relative flex flex-wrap",
          'after:bg-foreground/10 transition-all after:absolute after:inset-[anchor(--cover_start)] after:z-[-1] after:rounded-sm after:duration-300 after:ease-(--easing) after:content-[""] after:[block-size:anchor-size(--cover_block)] after:[inline-size:anchor-size(--cover_inline)]'
        )}
      >
        <li>
          {currentCategory === "all" ? (
            <span className={styleActive}>すべて</span>
          ) : (
            <Link href="/blog" className={styleNotActive}>
              すべて
            </Link>
          )}
        </li>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              {currentCategory === category.slug ? (
                <span className={styleActive}>{category.name}</span>
              ) : (
                <Link
                  href={`/blog/category/${category.slug}`}
                  className={styleNotActive}
                >
                  {category.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListCategory;
