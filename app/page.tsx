import type { Blog } from "@/app/types/common";

import WrapperContent from "./components/common/wrapper/wrapper-content";
import HeadingSection from "./components/common/heading/heading-section";
import CardBlog from "./components/common/card/card-blog";
import ButtonText from "./components/common/button/button-text";
import { cn } from "@/lib/utils";

import { getBlogs } from "@/libs/microcms";

export default async function Home() {
  // 最近の記事
  const dataRecently = await getBlogs({ limit: 3 });

  // 技術
  const dataTech = await getBlogs({ limit: 3, category: "lbtcqgor3ra" });

  // 音楽
  const dataMusic = await getBlogs({ limit: 3, category: "qw7tpo20vys" });

  // 生活
  const dataLife = await getBlogs({ limit: 3, category: "0y5yavkzrl3l" });

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
          <p className="mt-2">
            当サイトは
            <br className="md:hidden" />
            Next.js/microCMS にて構築しています。
          </p>
        </div>
      </section>

      <section className="mt-32">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <HeadingSection en="RECENTLY" ja="最近の記事" />
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
              return <CardBlog key={item.id} blog={item} />;
            })
          ) : (
            <p className="text-lg font-medium">記事がありません。</p>
          )}
        </div>
      </section>

      <section className="mt-32">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <HeadingSection en="TECH" ja="技術" />
          {dataTech.contents.length > 3 && (
            <ButtonText
              label="一覧を見る"
              link={{ href: "/blog/tech" }}
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
        <div className="flex flex-wrap items-end justify-between gap-2">
          <HeadingSection en="MUSIC" ja="音楽" />
          {dataMusic.contents.length > 3 && (
            <ButtonText
              label="一覧を見る"
              link={{ href: "/blog/music" }}
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
        <div className="flex flex-wrap items-end justify-between gap-2">
          <HeadingSection en="LIFE" ja="生活" />
          {dataLife.contents.length > 3 && (
            <ButtonText
              label="一覧を見る"
              link={{ href: "/blog/life" }}
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
