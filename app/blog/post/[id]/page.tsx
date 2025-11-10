import HeadingSection from "@/app/components/common/heading/heading-section";
import WrapperContent from "@/app/components/common/wrapper/wrapper-content";

import { getAllContentIds } from "@/libs/microcms";

import { notFound } from "next/navigation";

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

  return (
    <WrapperContent>
      <HeadingSection en="ARTICLE" ja="記事" />
    </WrapperContent>
  );
}

// 静的パスの生成
export async function generateStaticParams() {
  const contentIds = await getAllContentIds("blog");

  return contentIds.map((id) => ({ id }));
}
