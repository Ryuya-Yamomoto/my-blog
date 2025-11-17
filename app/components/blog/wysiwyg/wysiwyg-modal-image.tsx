import { cn } from "@/lib/utils";

import ButtonClose from "../../common/button/button-close";

type WysiwygModalImageProps = {
  isOpen: boolean;
  handleToggleModal: () => void;
  children: React.ReactNode;
};

const WysiwygModalImage = ({
  isOpen,
  handleToggleModal,
  children,
}: WysiwygModalImageProps) => {
  return (
    <div
      onClick={handleToggleModal}
      className={cn(
        "pointer-events-none fixed inset-0 z-100 grid place-items-center p-4 opacity-0 transition-opacity duration-600",
        "md:p-20",
        isOpen && "pointer-events-auto opacity-100"
      )}
    >
      <div
        className={cn(
          "transition-[background, backdrop-blur] absolute inset-0 duration-600",
          isOpen ? "bg-black/50 backdrop-blur-sm" : ""
        )}
      ></div>
      <figure
        className={cn(
          "relative m-0 h-full max-h-[70vh] w-full max-w-full",
          "md:max-h-[80vh] md:max-w-[80vw]"
        )}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {children}
        <ButtonClose label="close" handleClick={handleToggleModal} />
      </figure>
    </div>
  );
};

export default WysiwygModalImage;
