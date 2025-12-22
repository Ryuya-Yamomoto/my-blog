import type { Blog, Category } from "@/app/types/common";

import { cn } from "@/lib/utils";

import BlockSpotify from "@/app/components/blog/block/block-spotify";
import SplideCarousel from "../splide/splide-carousel";
import ButtonText from "../../common/button/button-text";

type BlockArticleBottomProps = {
  spotify_album_id?: string;
  category: Category;
  otherArticles?: Blog[];
  className?: string;
};

const BlockArticleBottom = ({
  spotify_album_id,
  category,
  otherArticles,
  className,
}: BlockArticleBottomProps) => {
  return (
    <div className={cn("mt-28 grid gap-y-4 border-t pt-12", className)}>
      {spotify_album_id && <BlockSpotify id={spotify_album_id} />}

      {otherArticles && otherArticles.length > 0 && (
        <SplideCarousel blogs={otherArticles} category={category.name} />
      )}

      <ButtonText
        link={{ href: `/blog/category/${category.slug}` }}
        label={`${category.name} 記事一覧へ`}
        className="mt-8"
      />
      <ButtonText link={{ href: "/blog" }} label="記事一覧へ" />
    </div>
  );
};

export default BlockArticleBottom;
