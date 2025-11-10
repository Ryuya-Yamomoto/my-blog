import { getCategories, getBlogs } from "@/libs/microcms";
import { notFound } from "next/navigation";

import WrapperContent from "@/app/components/common/wrapper/wrapper-content";
import HeadingSection from "../../components/common/heading/heading-section";
import CardBlog from "../../components/blog/card/card-blog";
import ListCategory from "../../components/blog/list/list-category";
import { cn } from "@/lib/utils";

type Prop = {
  params: Promise<{
    category: string;
  }>;
};

export default async function Page({ params }: Prop) {
  // URL からslugパラメータを取得
  const { category: categorySlug } = await params;

  // 有効なURLかどうかを判別
  const categories = await getCategories();
  const isValidCategory = categories.contents.find(
    (category) => category.slug === categorySlug
  );

  // 存在しないカテゴリならば404
  if (!isValidCategory) notFound();

  // カテゴリに絞り込んだ記事一覧を取得
  const data = await getBlogs({ category: isValidCategory.id });

  return (
    <WrapperContent>
      <HeadingSection en={isValidCategory.slug} ja={isValidCategory.name} />
      <ListCategory
        className="mt-16"
        categories={categories.contents}
        currentCategory={categorySlug}
      />
      {data.contents.length === 0 ? (
        <p className="mt-16 text-lg font-medium">記事が存在しません。</p>
      ) : (
        <div
          className={cn(
            "relative mt-16 grid grid-cols-2",
            "lg:grid-cols-3",
            "after:bg-foreground/5 after:absolute after:inset-[anchor(--cover_start)] after:z-[-1] after:rounded-sm after:duration-300 after:content-[''] after:[block-size:anchor-size(--cover_block)] after:[inline-size:anchor-size(--cover_inline)]"
          )}
        >
          {data.contents.map((blog) => (
            <CardBlog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </WrapperContent>
  );
}

// SSG用のパスを生成
export async function generateStaticParams() {
  // カテゴリ一覧の取得
  const categories = await getCategories();

  return categories.contents.map((category) => ({
    category: category.slug,
  }));
}
