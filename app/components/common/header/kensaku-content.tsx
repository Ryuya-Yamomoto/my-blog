import { cn } from "@/lib/utils";
import type { Blog } from "@/app/types/common";

import BlockKensaku from "./block-kensaku";

type KensakuContentProps = {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  blogs: Blog[];
};

const KensakuContent = ({ isOpen, handleOpen, blogs }: KensakuContentProps) => {
  return (
    <>
      <div
        className={cn(
          "transition-[background, backdrop-blur] pointer-events-none absolute h-screen w-screen duration-600",
          isOpen
            ? "pointer-events-auto relative bg-black/50 backdrop-blur-sm"
            : ""
        )}
        onClick={() => handleOpen(!isOpen)}
      ></div>
      <BlockKensaku isOpen={isOpen} blogs={blogs} />
    </>
  );
};

export default KensakuContent;
