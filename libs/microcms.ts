import { createClient } from "microcms-js-sdk";

import type { Blog, Category, BlogArticle } from "@/app/types/common";

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// Client SDKの初期化
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 型定義
export type MicroCMSResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// 記事一覧の取得
export const getBlogs = async ({
  limit,
  filters,
}: {
  limit?: number;
  filters?: string;
}): Promise<MicroCMSResponse<Blog>> => {
  return await client.get<MicroCMSResponse<Blog>>({
    endpoint: "blog",
    queries: {
      limit,
      filters,
    },
  });
};

// 詳細記事の取得
export const getBlogArticle = async (
  contentId: string
): Promise<BlogArticle> => {
  return await client.get<BlogArticle>({
    endpoint: "blog",
    contentId,
  });
};

// カテゴリ一覧を取得
export const getCategories = async (): Promise<MicroCMSResponse<Category>> => {
  return await client.get<MicroCMSResponse<Category>>({
    endpoint: "categories",
  });
};

// すべての要素のIDを取得（SSG用）
export const getAllContentIds = async (endpoint: string): Promise<string[]> => {
  const contentIds = await client.getAllContentIds({ endpoint });
  return contentIds;
};
