import type { Blog } from "@/app/types/common";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import BadgeRounded from "../../common/badge/badge-rounded";

type cardBlogProps = {
  blog: Blog;
};

const CardBlog = ({ blog }: cardBlogProps) => {
  return (
    <Link
      href={`/blog/post/${blog.id}`}
      className={cn(
        "group relative row-span-4 grid w-full grid-rows-subgrid p-4",
        "hover:[anchor-name:--cover]"
      )}
    >
      <figure className="block aspect-square w-full overflow-hidden rounded-sm">
        <Image
          src={blog.thumbnail.url}
          alt={blog.title}
          width={blog.thumbnail.width}
          height={blog.thumbnail.height}
          className="h-full w-full object-cover"
        />
      </figure>
      <div
        className={cn(
          "relative row-span-3 grid grid-rows-subgrid gap-y-2 pt-1 pb-8",
          "before:bg-foreground/10 before:absolute before:bottom-0 before:left-0 before:block before:h-0.5 before:w-full before:content-['']",
          "after:bg-foreground after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:origin-left after:scale-x-[0.2] after:transition-[scale] after:duration-300 after:ease-(--easing) after:content-['']",
          "group-hover:after:scale-x-100"
        )}
      >
        <div className="flex flex-wrap items-center justify-between">
          <BadgeRounded text={blog.category.name} />
          <p className="text-sm font-medium">
            {format(new Date(blog.publishedAt), "yyyy.MM.dd")}
          </p>
        </div>
        <p
          className={cn(
            "line-clamp-1 text-xl font-bold",
            "md:text-2xl",
            "lg:text-xl"
          )}
        >
          {blog.title}
        </p>
        <div
          className="mt-2 line-clamp-2 font-medium"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
      </div>
    </Link>
  );
};

export default CardBlog;
