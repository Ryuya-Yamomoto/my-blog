import { createClient } from "microcms-js-sdk";

import { Blog } from "@/app/types/common";

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

// 最近の記事を取得
export const getRecentBlogs = async (
  limit: number = 3
): Promise<MicroCMSResponse<Blog>> => {
  return await client.get<MicroCMSResponse<Blog>>({
    endpoint: "blog",
    queries: { limit },
  });
};

// カテゴリ別の記事を取得 ＝＝＝＝＝＝＝＝＝＝
// 技術
export const getTechBlog = async (
  limit: number = 3
): Promise<MicroCMSResponse<Blog>> => {
  return await client.get<MicroCMSResponse<Blog>>({
    endpoint: "blog",
    queries: {
      limit,
      filters: "category[equals]lbtcqgor3ra",
    },
  });
};

// 音楽
export const getMusicBlog = async (
  limit: number = 3
): Promise<MicroCMSResponse<Blog>> => {
  return await client.get<MicroCMSResponse<Blog>>({
    endpoint: "blog",
    queries: {
      limit,
      filters: "category[equals]qw7tpo20vys",
    },
  });
};

// 生活
export const getLifeBlog = async (
  limit: number = 3
): Promise<MicroCMSResponse<Blog>> => {
  return await client.get<MicroCMSResponse<Blog>>({
    endpoint: "blog",
    queries: {
      limit,
      filters: "category[equals]0y5yavkzrl3l",
    },
  });
};
