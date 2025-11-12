/**
 *
 * @param html: string
 * @returns string
 * @description HTMLタグを除去してプレーンテキストを抽出するユーティリティ関数
 */

const StripHtmlTags = (html: string): string => {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, "") // HTMLタグを削除
    .replace(/&nbsp;/g, " ") // &nbsp;をスペースに変換
    .replace(/&amp;/g, "&") // &amp;を&に変換
    .replace(/&lt;/g, "<") // &lt;を<に変換
    .replace(/&gt;/g, ">") // &gt;を>に変換
    .replace(/&quot;/g, '"') // &quot;を"に変換
    .trim(); // 前後の空白を削除
};

export default StripHtmlTags;
