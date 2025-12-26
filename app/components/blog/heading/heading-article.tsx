import { format } from "date-fns";
import { cn } from "@/lib/utils";

import BadgeRounded from "../../common/badge/badge-rounded";

type HeadingArticleProps = {
  title: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  className?: string;
};

const HeadingArticle = ({
  title,
  publishedAt,
  updatedAt,
  category,
  className,
}: HeadingArticleProps) => {
  return (
    <hgroup className={className}>
      <h2 className={cn("border-b-2 pb-4 text-3xl", "md:text-5xl")}>{title}</h2>
      <div className="mt-1 flex flex-wrap items-baseline justify-between">
        <BadgeRounded text={category} />
        <div className="grid grid-cols-[max-content_1fr] justify-end text-xs">
          <div className="col-span-full grid grid-cols-subgrid items-baseline gap-x-2">
            <p>公開日</p>
            <p className="font-inter">
              {format(new Date(publishedAt), "yyyy.MM.dd")}
            </p>
          </div>
          {updatedAt && (
            <div className="col-span-full grid grid-cols-subgrid items-baseline gap-x-2">
              <p>更新日</p>
              <p className="font-inter">
                {format(new Date(updatedAt), "yyyy.MM.dd")}
              </p>
            </div>
          )}
        </div>
      </div>
    </hgroup>
  );
};

export default HeadingArticle;
