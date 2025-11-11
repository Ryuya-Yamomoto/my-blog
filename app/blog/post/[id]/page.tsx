import type { Metadata } from "next";
import { getBlogArticle, getAllContentIds } from "@/libs/microcms";
import type { BlogArticle } from "@/app/types/common";

import type { CheerioAPI } from "cheerio";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import HeadingSection from "@/app/components/common/heading/heading-section";
import HeadingArticle from "@/app/components/blog/heading/heading-article";
import WrapperContent from "@/app/components/common/wrapper/wrapper-content";

import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

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

  // コードブロックのハイライト スタイル 処理
  const $: CheerioAPI = load(article.body);
  // 複数行コードブロック対応
  $("pre code").each((_, elem) => {
    const className = $(elem).attr("class"); // pre 内の code タグの class 属性を取得する
    const language = className?.replace("language-", ""); // language- を空文字にして言語だけを取り除く
    const fileName = $(elem).parent().parent().attr("data-filename");

    let result;
    if (language) {
      try {
        result = hljs.highlight($(elem).text(), { language });
      } catch (error) {
        console.log("highlight", error);
        result = hljs.highlightAuto($(elem).text());
      }
    } else {
      result = hljs.highlightAuto($(elem).text());
    }
    $(elem).html(result.value);
    $(elem).addClass("hljs");

    if (fileName) {
      const fileNameStyle = cn(
        "bg-code text-background/50 border-b px-4 py-2 tracking-wide font-inter"
      );

      $(elem)
        .parent()
        .before(`<div class="${fileNameStyle}"><span>${fileName}</span></div>`);
      const grandParent = $(elem).parent().parent();
      grandParent.addClass("rounded-t-xl overflow-hidden rounded-b-sm mt-4");
    }
  });
  article.body = $.html();

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
        className="wysiwyg mt-32 px-4"
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
