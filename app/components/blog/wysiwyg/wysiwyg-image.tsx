"use client";

import React, { useState } from "react";
import { useScrollLock } from "@/app/hooks/useScrollLock";

import Image from "next/image";
import WysiwygModalImage from "./wysiwyg-modal-image";
import { cn } from "@/lib/utils";

type ImageProps = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type WysiwygImageProps = {
  image: ImageProps;
  figCaption?: string;
};

const WysiwygImage = ({ image, figCaption }: WysiwygImageProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { id, src, alt, width, height } = image;

  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  useScrollLock(isModalOpen);

  return (
    <>
      {/* クリッカブルイメージ */}
      <figure>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onClick={handleToggleModal}
          className={cn("cursor-pointer")}
        />
        {figCaption && <figcaption>{figCaption}</figcaption>}
      </figure>

      {/* モーダル要素 */}
      <WysiwygModalImage
        isOpen={isModalOpen}
        handleToggleModal={handleToggleModal}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onClick={(e) => e.stopPropagation()}
          className={cn("h-full w-full object-contain")}
        />
      </WysiwygModalImage>
    </>
  );
};

export default WysiwygImage;
