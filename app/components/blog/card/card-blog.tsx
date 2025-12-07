"use client";

import type { Blog } from "@/app/types/common";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import StripHtmlTags from "@/utils/common/stripHtmlTags";

import Link from "next/link";
import Image from "next/image";
import BadgeRounded from "../../common/badge/badge-rounded";
import { unstable_ViewTransition as ViewTransition } from "react";

type cardBlogProps = {
  blog: Blog;
  className?: string;
};

const CardBlog = ({ blog, className }: cardBlogProps) => {
  return (
    <Link
      href={`/blog/post/${blog.id}`}
      className={cn(
        "group relative row-span-4 grid w-full grid-rows-subgrid px-1 py-4",
        "md:px-4",
        "hover:[anchor-name:--cover]",
        "focus:[anchor-name:--cover]",
        className
      )}
    >
      <figure
        className={cn(
          "block aspect-square w-full overflow-hidden rounded-sm",
          blog.thumbnail ?? "bg-foreground/50 grid place-items-center"
        )}
      >
        <ViewTransition name={`thumb-${blog.id}`}>
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              width={blog.thumbnail.width}
              height={blog.thumbnail.height}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src="/images/common/icon_no-image.svg"
              alt="No Image"
              width={42}
              height={42}
            />
          )}
        </ViewTransition>
      </figure>
      <div
        className={cn(
          "relative row-span-3 grid grid-rows-subgrid gap-y-1 pt-1 pb-8",
          "md:gap-y-2",
          "before:bg-foreground/10 before:absolute before:bottom-0 before:left-0 before:block before:h-0.5 before:w-full before:content-['']",
          "after:bg-foreground after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:origin-left after:scale-x-[0.2] after:transition-[scale] after:duration-300 after:ease-(--easing) after:content-['']",
          "group-hover:after:scale-x-100",
          "group-focus:after:scale-x-100"
        )}
      >
        <div className="flex flex-wrap items-center justify-between">
          <BadgeRounded text={blog.category.name} />
          <p className="font-inter text-xs">
            {format(new Date(blog.publishedAt), "yyyy.MM.dd")}
          </p>
        </div>
        <p
          className={cn(
            "line-clamp-2 text-base font-bold",
            "md:mt-2 md:line-clamp-1 md:text-2xl",
            "lg:text-xl"
          )}
        >
          {blog.title}
        </p>
        <p className={"line-clamp-2 text-sm"}>{StripHtmlTags(blog.body)}</p>
      </div>
    </Link>
  );
};

export default CardBlog;
