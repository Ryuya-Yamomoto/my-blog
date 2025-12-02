import type { Blog } from "@/app/types/common";

import WrapperContent from "./components/common/wrapper/wrapper-content";
import HeadingSection from "./components/common/heading/heading-section";
import CardBlog from "./components/common/card/card-blog";
import ButtonText from "./components/common/button/button-text";
import { cn } from "@/lib/utils";

import { getBlogs, getCategories } from "@/libs/microcms";

export default async function Home() {
  // カテゴリを全て取得
  const categories = await getCategories();

  // 最近の記事
  const dataRecently = await getBlogs({ limit: 3 });

  // 技術
  const dataTech = await getBlogs({
    limit: 3,
    filters: `category[equals]${categories.contents.find((category) => category.slug === "tech")?.id}`,
  });

  // 音楽
  const dataMusic = await getBlogs({
    limit: 3,
    filters: `category[equals]${categories.contents.find((category) => category.slug === "music")?.id}`,
  });

  // 生活
  const dataLife = await getBlogs({
    limit: 3,
    filters: `category[equals]${categories.contents.find((category) => category.slug === "life")?.id}`,
  });

  return (
    <WrapperContent>
      <section>
        <HeadingSection en="ABOUT" ja="私" />
        <div className="mt-4 text-base leading-[1.6] font-medium">
          <p>
            1997年3月25日生まれ。栃木県出身。
            <br />
            都内の大学を卒業後、
            <br className="md:hidden" />
            照明メーカーの営業職として就職。
            <br />
            その後、地元の栃木に戻り、
            <br className="md:hidden" />
            2022年3月からWeb制作会社に転職、
            <br className="md:hidden" />
            フロントエンドエンジニアとして従事。
            <br />
            趣味は音楽と料理。あとプログラミング。
          </p>
          <p className="mt-4">
            当サイトは
            <br className="md:hidden" />
            Next.js / microCMS / vercel
            <br className="md:hidden" />
            にて構築しています。
          </p>
          <p className="mt-4">
            平日夜、土日祝日稼働の副業案件を
            <br className="md:hidden" />
            募集しております。
            <br />
            (Next.js、React、TypeScript...etc.)
            <br />
            お気軽にご相談ください。
          </p>
        </div>
      </section>

      <section className="mt-32">
        <div
          className={cn(
            "flex flex-col flex-wrap items-start gap-2",
            "md:flex-row md:items-end md:justify-between"
          )}
        >
          <HeadingSection en="RECENTLY" ja="最近の記事" notShowJa={true} />
          {dataRecently.contents.length > 2 && (
            <ButtonText
              label="一覧を見る"
              link={{ href: "/blog" }}
              className="mt-4"
            />
          )}
        </div>
        <div className={cn("mt-4 grid gap-4", "lg:grid-cols-3")}>
          {dataRecently.contents.length > 0 ? (
            dataRecently.contents.map((item: Blog) => {
              return (
                <CardBlog key={item.id} blog={item} isViewTransition={false} />
              );
            })
          ) : (
            <p className="text-lg font-medium">記事がありません。</p>
          )}
        </div>
      </section>

      <section className="mt-32">
        <div
          className={cn(
            "flex flex-col flex-wrap items-start gap-2",
            "md:flex-row md:items-end md:justify-between"
          )}
        >
          <HeadingSection en="TECH" ja="技術" />
          {dataTech.contents.length > 2 && (
            <ButtonText
              label="一覧を見る"
              link={{ href: "/blog/category/tech" }}
              className="mt-4"
            />
          )}
        </div>
        <div className={cn("mt-4 grid gap-4", "lg:grid-cols-3")}>
          {dataTech.contents.length > 0 ? (
            dataTech.contents.map((item: Blog) => {
              return <CardBlog key={item.id} blog={item} />;
            })
          ) : (
            <p className="text-lg font-medium">記事がありません。</p>
          )}
        </div>
      </section>

      <section className="mt-32">
        <div
          className={cn(
            "flex flex-col flex-wrap items-start gap-2",
            "md:flex-row md:items-end md:justify-between"
          )}
        >
          <HeadingSection en="MUSIC" ja="音楽" />
          {dataMusic.contents.length > 2 && (
            <ButtonText
              label="一覧を見る"
              link={{ href: "/blog/category/music" }}
              className="mt-4"
            />
          )}
        </div>
        <div className={cn("mt-4 grid gap-4", "lg:grid-cols-3")}>
          {dataMusic.contents.length > 0 ? (
            dataMusic.contents.map((item: Blog) => {
              return <CardBlog key={item.id} blog={item} />;
            })
          ) : (
            <p className="text-lg font-medium">記事がありません。</p>
          )}
        </div>
      </section>

      <section className="mt-32">
        <div
          className={cn(
            "flex flex-col flex-wrap items-start gap-2",
            "md:flex-row md:items-end md:justify-between"
          )}
        >
          <HeadingSection en="LIFE" ja="生活" />
          {dataLife.contents.length > 2 && (
            <ButtonText
              label="一覧を見る"
              link={{ href: "/blog/category/life" }}
              className="mt-4"
            />
          )}
        </div>
        <div className={cn("mt-4 grid gap-4", "lg:grid-cols-3")}>
          {dataLife.contents.length > 0 ? (
            dataLife.contents.map((item: Blog) => {
              return <CardBlog key={item.id} blog={item} />;
            })
          ) : (
            <p className="text-lg font-medium">記事がありません。</p>
          )}
        </div>
      </section>
    </WrapperContent>
  );
}
