import { client } from "@/libs/microcms";
import type { Blog } from "@/app/types/common";

import HeadingSection from "./components/common/heading/heading-section";
import CardBlog from "./components/common/card/card-blog";
import ButtonPrimary from "./components/common/button/button-rect";

export default async function Home() {
  // 最近の記事
  const dataRecently = await client.get({
    endpoint: "blog",
    queries: { limit: 3 },
  });

  // 技術
  const dataTech = await client.get({
    endpoint: "blog",
    queries: { limit: 3, filters: "category[equals]lbtcqgor3ra" },
  });

  // 音楽
  const dataMusic = await client.get({
    endpoint: "blog",
    queries: { limit: 3, filters: "category[equals]qw7tpo20vys" },
  });

  // 生活
  const dataLife = await client.get({
    endpoint: "blog",
    queries: { limit: 3, filters: "category[equals]0y5yavkzrl3l" },
  });

  return (
    <div className="row">
      <section className="mt-32">
        <HeadingSection en="ABOUT" ja="私" />
        <div className="mt-4 text-base leading-[1.6] font-medium">
          <p>
            1997年3月25日生まれ。栃木県出身。
            <br />
            都内の大学を卒業後、照明メーカーの営業職として就職。
            <br />
            その後、地元の栃木に戻り、2022年3月からWeb制作会社に転職、フロントエンドエンジニアとして従事。
            <br />
            趣味は音楽と料理。あとプログラミング。
          </p>
          <p className="mt-2">
            当サイトは Next.js/microCMS にて構築しています。
          </p>
        </div>
      </section>

      <section className="mt-32">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <HeadingSection en="RECENTLY" ja="最近の記事" />
          {dataRecently.contents.length > 2 && (
            <ButtonPrimary
              label="一覧を見る"
              link={{ href: "#" }}
              className="mt-4"
            />
          )}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
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
            <ButtonPrimary
              label="一覧を見る"
              link={{ href: "#" }}
              className="mt-4"
            />
          )}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
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
            <ButtonPrimary
              label="一覧を見る"
              link={{ href: "#" }}
              className="mt-4"
            />
          )}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
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
            <ButtonPrimary
              label="一覧を見る"
              link={{ href: "#" }}
              className="mt-4"
            />
          )}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {dataLife.contents.length > 0 ? (
            dataLife.contents.map((item: Blog) => {
              return <CardBlog key={item.id} blog={item} />;
            })
          ) : (
            <p className="text-lg font-medium">記事がありません。</p>
          )}
        </div>
      </section>
    </div>
  );
}
