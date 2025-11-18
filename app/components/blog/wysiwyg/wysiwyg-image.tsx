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
      {isModalOpen ? (
        <figure>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onClick={handleToggleModal}
            className={cn(`cursor-pointer aspect-[${width}/${height}]`)}
          />
          {figCaption && <figcaption>{figCaption}</figcaption>}
        </figure>
      ) : (
        <figure>
          <ViewTransition name={`wysiwyg-thumb-${id}`}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              onClick={handleToggleModal}
              className={cn(`cursor-pointer aspect-[${width}/${height}]`)}
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
              className={cn(
                `aspect-[${width}/${height}] absolute top-1/2 left-1/2 z-10 block h-auto max-h-[80%] w-auto max-w-[80%] -translate-x-1/2 -translate-y-1/2`
              )}
              onClick={(e) => e.stopPropagation()}
            />
          </ViewTransition>
        </WysiwygModalImage>
      )}
    </>
  );
};

export default WysiwygImage;
