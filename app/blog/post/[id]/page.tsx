import type { Metadata } from "next";
import type { BlogArticle } from "@/app/types/common";

import { getBlogArticle, getAllContentIds, getBlogs } from "@/libs/microcms";

import HeadingSection from "@/app/components/common/heading/heading-section";
import HeadingArticle from "@/app/components/blog/heading/heading-article";
import WrapperContent from "@/app/components/common/wrapper/wrapper-content";
import BlockArticleBottom from "@/app/components/blog/block/block-articleBottom";
import Image from "next/image";
import {
  HTMLAttributes,
  unstable_ViewTransition as ViewTransition,
} from "react";
import BlockWysiwygContent from "@/app/components/blog/block/block-wysiwyg-content";

import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";

export type WysiwygModalImageProps = {
  id: string;
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
} & HTMLAttributes<HTMLImageElement>;

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

  // 他の記事情報を取得（当ページを除いた、同じカテゴリの最新6件を取得する）
  const otherArticles = await getBlogs({
    limit: 6,
    filters: `category[equals]${article.category.id}[and]id[not_equals]${article.id}`,
  });

  return (
    <WrapperContent>
      <HeadingSection en="ARTICLE" ja="記事" />
      <HeadingArticle
        title={article.title}
        publishedAt={article.publishedAt}
        updatedAt={
          article.category.slug === "tech" ? article.updatedAt : undefined
        }
        category={article.category.name}
        className={cn("mt-16", "md:mt-32")}
      />
      {article.thumbnail && (
        <figure
          className={cn(
            "mx-auto mt-8 aspect-square w-full max-w-160",
            "md:mt-16"
          )}
        >
          <ViewTransition name={`thumb-${article.id}`}>
            <Image
              src={article.thumbnail.url}
              alt="サムネイル"
              width={article.thumbnail.width}
              height={article.thumbnail.height}
              className="h-full w-full object-cover"
            />
          </ViewTransition>
        </figure>
      )}

      <div className={cn("mt-8 grid border-t pt-16", "md:mt-24 md:px-4")}>
        <div className={cn("wysiwyg px-0")}>
          <BlockWysiwygContent html={article.body} />
        </div>
      </div>

      <BlockArticleBottom
        category={article.category}
        otherArticles={otherArticles.contents}
      />
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
