import { cn } from "@/lib/utils";

import ButtonClose from "../../common/button/button-close";
import React from "react";

type WysiwygModalImageProps = {
  isOpen: boolean;
  handleToggleModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
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
        "pointer-events-none fixed inset-0 z-100 grid place-items-center p-4 opacity-0",
        "md:p-20",
        isOpen && "pointer-events-auto opacity-100"
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
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
      </figure>
      <ButtonClose label="close" handleClick={handleToggleModal} />
    </div>
  );
};

export default WysiwygModalImage;
