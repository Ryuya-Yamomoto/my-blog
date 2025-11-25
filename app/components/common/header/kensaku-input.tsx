"use client";

import useStore from "@/app/store/useStore";

import Image from "next/image";

const KensakuInput = () => {
  const { searchQuery, setSearchQuery } = useStore();

  // 検索テキスト入力ハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="grid grid-cols-[3rem_1fr] overflow-hidden rounded-sm">
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
        placeholder="検索..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full bg-black/50 px-4 py-4 text-base placeholder:text-white/40"
      />
    </div>
  );
};

export default KensakuInput;
