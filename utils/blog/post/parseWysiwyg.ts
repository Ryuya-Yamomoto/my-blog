/**
  @param: articleBody: string - WYSIWYGエディタからのHTML文字列
  @return: string - パース後のHTML文字列
  @description: WYSIWYGエディタから取得したHTMLをパースして、必要な加工を行うユーティリティ関数
*/

import type { CheerioAPI } from "cheerio";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import { cn } from "@/lib/utils";

const ParseWysiwyg = (body: string): string => {
  let result = "";

  const $: CheerioAPI = load(body);

  // コードブロック ハイライト処理
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
        "bg-code text-white/50 border-b px-4 py-2 tracking-wide font-inter"
      );

      $(elem)
        .parent()
        .before(`<div class="${fileNameStyle}"><span>${fileName}</span></div>`);
      const grandParent = $(elem).parent().parent();
      grandParent.addClass(
        "rounded-t-xl overflow-hidden rounded-b-sm mt-4 dark:border"
      );
    }
  });

  // テーブル 処理
  $("table").each((_, elem) => {
    $(elem).wrap('<div class="container-table"></div>');
  });

  // body部分のHTMLのみを取得（html, head, bodyタグを含めない）
  result = $("body").html() || $.html();

  return result;
};

export default ParseWysiwyg;
