import SectionMv from "../components/about/section-mv";
import SectionTech from "../components/about/section-tech";
import SectionAttitude from "../components/about/section-attitude";

export default async function Page() {
  return (
    <div className="is-about-page">
      <SectionMv />
      <SectionTech />
      <SectionAttitude />
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
