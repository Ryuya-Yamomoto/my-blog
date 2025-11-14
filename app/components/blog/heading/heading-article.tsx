import { format } from "date-fns";
import { cn } from "@/lib/utils";

import BadgeRounded from "../../common/badge/badge-rounded";

type HeadingArticleProps = {
  title: string;
  category: string;
  date: string;
  className?: string;
};

const HeadingArticle = ({
  title,
  date,
  category,
  className,
}: HeadingArticleProps) => {
  return (
    <hgroup className={className}>
      <h2 className={cn("border-b-2 pb-4 text-3xl font-bold", "md:text-5xl")}>
        {title}
      </h2>
      <div className="mt-1 flex flex-wrap items-center justify-between">
        <BadgeRounded text={category} />
        <p className="font-inter text-sm font-medium">
          {format(new Date(date), "yyyy.MM.dd")}
        </p>
      </div>
    </hgroup>
  );
};

export default HeadingArticle;
