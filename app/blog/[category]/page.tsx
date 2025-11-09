import { getCategories, getBlogs } from "@/libs/microcms";

type Prop = {
  params: Promise<{
    category: string;
  }>;
};

export default async function Page({ params }: Prop) {
  const { category } = await params;
  const data = await getBlogs({ category });
  console.log(data);

  return (
    <div className="row">
      <h1>Category: {category}</h1>
    </div>
  );
}

// SSG用のパスを生成
export async function generateStaticParams() {
  // カテゴリ一覧の取得
  const categories = await getCategories();

  return categories.contents.map((category) => ({
    category: category.slug,
  }));
}
