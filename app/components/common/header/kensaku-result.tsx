import { cn } from "@/lib/utils";
import type { Blog } from "@/app/types/common";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import StripHtmlTags from "@/utils/common/stripHtmlTags";

type KensakuResultProps = {
  filteredBlogs: Blog[] | null;
};

const KensakuResult = ({ filteredBlogs }: KensakuResultProps) => {
  return (
    <>
      {filteredBlogs === null ? (
        <></>
      ) : (
        <div className="mt-4">
          {filteredBlogs.length === 0 ? (
            <p>該当の記事が見つかりません。</p>
          ) : (
            <ul
              className={cn(
                "relative grid max-h-[60vh] overflow-auto",
                "after:bg-foreground/80 after:absolute after:inset-[anchor(--cover_start)] after:z-[-1] after:rounded-sm after:duration-300 after:content-[''] after:[block-size:anchor-size(--cover_block)] after:[inline-size:anchor-size(--cover_inline)]"
              )}
              data-lenis-prevent
            >
              {filteredBlogs.map((blog) => (
                <li key={blog.id}>
                  <Link
                    href={`/blog/post/${blog.id}`}
                    className={cn(
                      "grid grid-cols-[6rem_1fr] place-items-start gap-x-4 px-0 py-4",
                      "md:grid-cols-[8rem_1fr] md:px-4",
                      "hover:[anchor-name:--cover]",
                      "focus:[anchor-name:--cover]"
                    )}
                  >
                    <figure className="aspect-square w-full">
                      <Image
                        src={
                          blog.thumbnail?.url ||
                          "/images/common/icon_no-image.svg"
                        }
                        alt={blog.title}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </figure>
                    <div>
                      <p
                        className={cn(
                          "line-clamp-2 text-base font-bold",
                          "md:line-clamp-1 md:text-2xl",
                          "lg:text-xl"
                        )}
                      >
                        {blog.title}
                      </p>
                      <p className={cn("font-inter mt-1 text-sm font-medium")}>
                        {format(new Date(blog.publishedAt), "yyyy.MM.dd")}
                      </p>
                      <p
                        className={cn(
                          "mt-2 line-clamp-2 text-sm font-medium",
                          "md:text-base"
                        )}
                      >
                        {StripHtmlTags(blog.body)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default KensakuResult;
