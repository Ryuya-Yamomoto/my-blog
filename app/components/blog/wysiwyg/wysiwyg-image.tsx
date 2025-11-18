"use client";

import type { WysiwygModalImageProps } from "@/app/blog/post/[id]/page";

import React, { useState, startTransition } from "react";

import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";
import WysiwygModalImage from "./wysiwyg-modal-image";
import { cn } from "@/lib/utils";

type WysiwygImageProps = {
  image: WysiwygModalImageProps;
  figCaption?: string;
};

const WysiwygImage = ({ image, figCaption }: WysiwygImageProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { id, src, alt, width, height } = image;

  const handleToggleModal = (
    e: React.MouseEvent<
      HTMLImageElement | HTMLDivElement | HTMLButtonElement,
      MouseEvent
    >
  ) => {
    e.stopPropagation();
    e.preventDefault();
    // setModalOpen((prev) => !prev);
    startTransition(() => setModalOpen((prev) => !prev));
  };

  return (
    <>
      {/* クリッカブルイメージ */}
      {!isModalOpen && (
        <figure>
          <ViewTransition name={`wysiwyg-thumb-${id}`}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              onClick={handleToggleModal}
              className={cn("cursor-pointer")}
            />
          </ViewTransition>
          {figCaption && <figcaption>{figCaption}</figcaption>}
        </figure>
      )}

      {/* モーダル要素 */}
      {isModalOpen && (
        <WysiwygModalImage
          isOpen={isModalOpen}
          handleToggleModal={handleToggleModal}
        >
          <ViewTransition name={`wysiwyg-thumb-${id}`}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={cn("h-full w-full object-contain")}
            />
          </ViewTransition>
        </WysiwygModalImage>
      )}
    </>
  );
};

export default WysiwygImage;
