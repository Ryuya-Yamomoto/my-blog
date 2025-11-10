import { createClient } from "microcms-js-sdk";

import { Blog, Category } from "@/app/types/common";

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
type MicroCMSResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// 記事一覧の取得
export const getBlogs = async ({
  limit,
  category,
}: {
  limit?: number;
  category?: string;
}): Promise<MicroCMSResponse<Blog>> => {
  return await client.get<MicroCMSResponse<Blog>>({
    endpoint: "blog",
    queries: {
      limit,
      filters: category ? `category[equals]${category}` : undefined,
    },
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
