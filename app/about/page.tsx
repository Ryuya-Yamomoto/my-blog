import type { Metadata } from "next";

import SectionMv from "../components/about/section-mv";
import SectionTech from "../components/about/section-tech";
import SectionAttitude from "../components/about/section-attitude";
import SectionMovie from "../components/about/section-movie";
import SectionContact from "../components/about/section-contact";

export const metadata: Metadata = {
  title: "私 | Ryuya Yamamoto",
};

export default async function Page() {
  return (
    <div className="is-about-page">
      <SectionMv />
      <SectionTech />
      <SectionAttitude />
      <SectionMovie />
      <SectionContact />
    </div>
  );
}

/**
 * 掲載内容
 *
 * - MV画像
 * - 自己紹介
 * - 技術スタック
 * - 好きなもの
 * - 写真いっぱい
 */
