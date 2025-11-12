import type { Blog, Category } from "@/app/types/common";

import { cn } from "@/lib/utils";

import SplideCarousel from "../splide/splide-carousel";
import ButtonText from "../../common/button/button-text";

type BlockArticleBottomProps = {
  category: Category;
  otherArticles?: Blog[];
  className?: string;
};

const BlockArticleBottom = ({
  category,
  otherArticles,
  className,
}: BlockArticleBottomProps) => {
  return (
    <div className={cn("mt-32 grid gap-y-4 border-t pt-8", className)}>
      {otherArticles && otherArticles.length > 0 && (
        <SplideCarousel blogs={otherArticles} category={category.name} />
      )}
      <ButtonText
        link={{ href: `/blog/category/${category.slug}` }}
        label={`${category.name} 記事一覧へ`}
        className="mt-4"
      />
      <ButtonText link={{ href: "/blog" }} label="記事一覧へ" />
    </div>
  );
};

export default BlockArticleBottom;
