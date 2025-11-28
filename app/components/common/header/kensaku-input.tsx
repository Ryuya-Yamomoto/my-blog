"use client";

import useStore from "@/app/store/useStore";
import { cn } from "@/lib/utils";

import Image from "next/image";
import ButtonClose from "../button/button-close";

type KensakuInputProps = {
  handleDeleteSearchQuery: () => void;
};

const KensakuInput = ({ handleDeleteSearchQuery }: KensakuInputProps) => {
  const { searchQuery, setSearchQuery } = useStore();

  // 検索テキスト入力ハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={cn(
        "relative grid grid-cols-[2rem_1fr] overflow-hidden rounded-sm",
        "md:grid-cols-[3rem_1fr]"
      )}
    >
      <span className="grid min-h-full w-full place-items-center bg-black/80">
        <Image
          src="/images/common/icon_search.svg"
          alt="検索"
          width={16}
          height={16}
          className="filter-[invert(1)]"
        />
      </span>
      <input
        type="text"
        placeholder="記事を検索..."
        value={searchQuery}
        onChange={handleInputChange}
        className={cn(
          "w-full bg-black/50 py-2 pr-8 pl-4 text-base outline-none placeholder:text-white/40",
          "md:py-4 md:pr-12"
        )}
      />
      <ButtonClose
        label="検索文字列を削除"
        handleClick={handleDeleteSearchQuery}
        className={cn(
          "top-1/2 right-0 -translate-y-1/2 hover:bg-white/10",
          "md:right-2"
        )}
        disabled={searchQuery === ""}
      />
    </div>
  );
};

export default KensakuInput;
