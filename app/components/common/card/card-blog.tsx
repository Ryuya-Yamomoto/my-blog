import type { Blog } from "@/app/types/common";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

type CardBlogProps = {
  blog: Blog;
};

const CardBlog = ({ blog }: CardBlogProps) => {
  return (
    <Link
      href="#"
      className="group relative block aspect-square w-full overflow-hidden"
    >
      <figure className="block h-full w-full">
        <Image
          src={blog.thumbnail.url}
          alt={blog.title}
          height={blog.thumbnail.height}
          width={blog.thumbnail.width}
          className="h-full w-full object-cover"
        />
      </figure>
      <div
        className={cn(
          "absolute top-0 left-0 grid h-full w-full place-items-center bg-black/50 p-4 backdrop-blur-sm transition-[opacity,filter] duration-300",
          "opacity-0 blur-sm",
          "group-hover:opacity-100 group-hover:blur-none"
        )}
      >
        <div className="text-white">
          <p className="line-clamp-1 text-xl font-bold">{blog.title}</p>
          <p className="text-sm">
            {format(new Date(blog.publishedAt), "yyyy-MM-dd")}
          </p>
          <div
            className="mt-4 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;
