import type { Metadata } from "next";
import { getBlogArticle, getAllContentIds } from "@/libs/microcms";
import type { BlogArticle } from "@/app/types/common";

import HeadingSection from "@/app/components/common/heading/heading-section";
import HeadingArticle from "@/app/components/blog/heading/heading-article";
import WrapperContent from "@/app/components/common/wrapper/wrapper-content";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: blogId } = await params;

  // 全記事のIDを取得、有効なパスかどうかの判別
  const contentIds = await getAllContentIds("blog");
  const isValidId = contentIds.includes(blogId);

  // 記事が存在しなければ404
  if (!isValidId) notFound();

  // 詳細記事の情報を取得
  const article: BlogArticle = await getBlogArticle(blogId);

  return (
    <WrapperContent>
      <HeadingSection en="ARTICLE" ja="記事" />
      <HeadingArticle
        title={article.title}
        date={article.publishedAt}
        category={article.category.name}
        className="mt-16"
      />
      <div
        className="wysiwyg mt-16"
        dangerouslySetInnerHTML={{ __html: article.body }}
      ></div>
    </WrapperContent>
  );
}

// メタの生成
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id: blogId } = await params;
  const contentIds = await getAllContentIds("blog");

  // 有効なパスかどうか判別
  const isValidId = contentIds.includes(blogId);

  // 404 メタ
  if (!isValidId) {
    return {
      title: "404 - ページが見つかりません | Ryuya Yamamoto",
      description: "お探しのページは見つかりませんでした。",
    };
  }

  // 記事情報の取得
  const article = await getBlogArticle(blogId);

  return {
    title: `${article.title} | Ryuya Yamamoto`,
  };
};

// 静的パスの生成
export async function generateStaticParams() {
  const contentIds = await getAllContentIds("blog");

  return contentIds.map((id) => ({ id }));
}
