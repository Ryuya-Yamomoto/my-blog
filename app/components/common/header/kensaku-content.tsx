import { cn } from "@/lib/utils";

type KensakuContentProps = {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
};

const KensakuContent = ({ isOpen, handleOpen }: KensakuContentProps) => {
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
    </>
  );
};

export default KensakuContent;
