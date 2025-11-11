import { getBlogs, getCategories } from "@/libs/microcms";
import type { Metadata } from "next";

import WrapperContent from "@/app/components/common/wrapper/wrapper-content";
import HeadingSection from "../components/common/heading/heading-section";
import CardBlog from "../components/blog/card/card-blog";
import ListCategory from "../components/blog/list/list-category";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "記事一覧 | Ryuya Yamamoto",
};

export default async function Page() {
  // 記事を全て取得
  const data = await getBlogs({ limit: 100 });

  // カテゴリ情報を取得
  const categories = await getCategories();

  return (
    <WrapperContent>
      <section>
        <HeadingSection en={"ALL"} ja={"すべて"} />
        <ListCategory
          className="mt-16"
          categories={categories.contents}
          currentCategory="all"
        />
        {data.contents.length === 0 ? (
          <p className="mt-16 text-lg font-medium">記事が存在しません。</p>
        ) : (
          <div
            className={cn(
              "relative mt-16 grid grid-cols-2",
              "lg:grid-cols-3",
              "after:bg-foreground/5 after:absolute after:inset-[anchor(--cover_start)] after:z-[-1] after:rounded-sm after:duration-300 after:ease-(--easing) after:content-[''] after:[block-size:anchor-size(--cover_block)] after:[inline-size:anchor-size(--cover_inline)]"
            )}
          >
            {data.contents.map((blog) => (
              <CardBlog key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </WrapperContent>
  );
}
