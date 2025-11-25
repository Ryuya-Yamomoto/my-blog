"use client";

import type { Blog } from "@/app/types/common";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import useStore from "@/app/store/useStore";
import { usePathname } from "next/navigation";

import KensakuInput from "./kensaku-input";
import KensakuResult from "./kensaku-result";

type BlockKensakuProps = {
  isOpen: boolean;
  blogs: Blog[];
};

const BlockKensaku = ({ isOpen, blogs }: BlockKensakuProps) => {
  // 検索フィルターが切り替わったら記事をフィルタリングして、KensakuResultコンポーネントに描画する分のデータを渡す
  const { searchQuery, setSearchQuery } = useStore();
  const tickRef = useRef<NodeJS.Timeout | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[] | null>(null);

  // 検索テキストは入力された際の処理
  useEffect(() => {
    if (tickRef.current) {
      clearTimeout(tickRef.current);
    }
    tickRef.current = setTimeout(() => {
      // 半角スペースで分割 それを配列にして、それぞれのテキストをすべて含む記事をフィルタリングして表示
      if (searchQuery.trim() === "") {
        setFilteredBlogs(null);
      } else {
        const separatedQueries = searchQuery
          .split(" ")
          .filter((q) => q.trim() !== "");
        const results = blogs.filter((blog) =>
          separatedQueries.every(
            (query) =>
              blog.title.toLowerCase().includes(query.toLowerCase()) ||
              blog.category.name.toLowerCase().includes(query.toLowerCase()) ||
              blog.body.toLowerCase().includes(query.toLowerCase())
          )
        );
        setFilteredBlogs(results);
      }
    }, 500);
  }, [searchQuery, blogs]);

  // URLが切り替わったら、検索テキストをクリア
  const pathname = usePathname();
  useEffect(() => {
    setSearchQuery("");
  }, [pathname, setSearchQuery]);

  return (
    <div
      className={cn(
        "box-shadow-primary absolute top-20 left-1/2 w-[90%] max-w-300 -translate-x-1/2 rounded-sm bg-black/60 px-4 py-4 text-white",
        "md:w-[80%] md:px-8 md:pt-8 md:pb-16",
        isOpen ? "pointer-events-auto block" : "pointer-events-none hidden"
      )}
    >
      <KensakuInput />
      <KensakuResult filteredBlogs={filteredBlogs} />
    </div>
  );
};

export default BlockKensaku;
