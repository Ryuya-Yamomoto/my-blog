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
  const isPortrait = height > width; //- 縦長の画像か否か

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
      <ClickableImage figCaption={figCaption}>
        {isModalOpen ? (
          <div
            style={{ aspectRatio: `${width}/${height}` }}
            className={cn(
              "mx-auto block",
              isPortrait
                ? "max-h-130 w-auto max-w-full md:h-130"
                : "h-auto w-130 max-w-full"
            )}
          ></div>
        ) : (
          <ViewTransition name={`wysiwyg-thumb-${id}`}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              onClick={handleToggleModal}
              style={{ aspectRatio: `${width}/${height}` }}
              className={cn(
                "mx-auto cursor-pointer rounded-sm",
                "origin-bottom-right -translate-2 [box-shadow:3px_3px_4px_2px_rgba(0,0,0,0.4)] transition-[box-shadow,translate] duration-600 ease-[var(--spring-easing)] hover:-translate-0 hover:[box-shadow:1px_1px_2px_0px_rgba(0,0,0,0)]",
                isPortrait
                  ? "max-h-130 w-auto max-w-full md:h-130"
                  : "h-auto w-130 max-w-full"
              )}
            />
          </ViewTransition>
        )}
      </ClickableImage>

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
              style={{ aspectRatio: `${width}/${height}` }}
              className={cn(
                "absolute top-1/2 left-1/2 z-10 block h-auto max-h-[80%] w-auto max-w-[80%] -translate-x-1/2 -translate-y-1/2 [box-shadow:3px_3px_4px_2px_rgba(0,0,0,0.4)]"
              )}
              onClick={(e) => e.stopPropagation()}
            />
          </ViewTransition>
        </WysiwygModalImage>
      )}
    </>
  );
};

const ClickableImage = ({
  children,
  figCaption,
}: {
  children: React.ReactNode;
  figCaption?: string;
}) => (
  <figure className="relative">
    {children}
    {figCaption && (
      <figcaption className="mx-auto w-fit">{figCaption}</figcaption>
    )}
  </figure>
);

export default WysiwygImage;
