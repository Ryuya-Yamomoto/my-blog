import type { Blog } from "@/app/types/common";

import Link from "next/link";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import StripHtmlTags from "@/utils/common/stripHtmlTags";

type CardBlogProps = {
  blog: Blog;
  isViewTransition?: boolean;
};

const CardBlog = ({ blog, isViewTransition = true }: CardBlogProps) => {
  return (
    <Link
      href={`/blog/post/${blog.id}`}
      className={cn(
        "group relative grid w-full grid-cols-[40%_1fr] gap-x-2",
        "lg:aspect-square lg:grid-cols-1 lg:gap-x-0 lg:overflow-hidden lg:rounded-sm"
      )}
    >
      <figure
        className={cn(
          "block aspect-square w-full overflow-hidden rounded-sm",
          blog.thumbnail ?? "bg-foreground/50 grid place-items-center"
        )}
      >
        {blog.thumbnail &&
          (isViewTransition ? (
            <ViewTransition name={`thumb-${blog.id}`}>
              <Image
                src={blog.thumbnail.url}
                alt={blog.title}
                height={blog.thumbnail.height}
                width={blog.thumbnail.width}
                className="h-full w-full object-cover transition-[scale] duration-300 group-hover:scale-[1.05]"
              />
            </ViewTransition>
          ) : (
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              height={blog.thumbnail.height}
              width={blog.thumbnail.width}
              className="h-full w-full object-cover transition-[scale] duration-300 group-hover:scale-[1.05]"
            />
          ))}

        {!blog.thumbnail && (
          <Image
            src="/images/common/icon_no-image.svg"
            alt="No Image"
            height={42}
            width={42}
          />
        )}

        {/* <ViewTransition name={`thumb-${blog.id}`}>
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              height={blog.thumbnail.height}
              width={blog.thumbnail.width}
              className="h-full w-full object-cover transition-[scale] duration-300 group-hover:scale-[1.05]"
            />
          ) : (
            <Image
              src="/images/common/icon_no-image.svg"
              alt="No Image"
              height={42}
              width={42}
            />
          )}
        </ViewTransition> */}
      </figure>
      <div
        className={cn(
          "place-items-[start_center] grid w-full",
          "lg:absolute lg:top-0 lg:left-0 lg:h-full lg:items-center lg:justify-items-start lg:bg-black/50 lg:p-4 lg:backdrop-blur-sm lg:transition-[opacity,filter] lg:duration-400",
          "lg:opacity-0 lg:blur-sm",
          "lg:group-hover:opacity-100 lg:group-hover:blur-none",
          "lg:group-focus:opacity-100 lg:group-focus:blur-none"
        )}
      >
        <div className="lg:text-white">
          <p
            className={cn(
              "line-clamp-1 text-xl font-bold",
              "md:text-2xl",
              "lg:text-xl"
            )}
          >
            {blog.title}
          </p>
          <p className="font-inter mt-1 text-sm font-medium">
            {format(new Date(blog.publishedAt), "yyyy.MM.dd")}
          </p>
          <p className="mt-2 line-clamp-2 font-medium">
            {StripHtmlTags(blog.body)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;
