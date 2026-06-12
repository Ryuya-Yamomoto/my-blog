"use client";

import type { WysiwygModalImageProps } from "@/app/blog/post/[id]/page";

import React, { useState, useLayoutEffect, startTransition } from "react";

import { unstable_ViewTransition as ViewTransition, useRef } from "react";
import Image from "next/image";
import ButtonClose from "../../common/button/button-close";
import { cn } from "@/lib/utils";

import { useScrollLock } from "@/app/hooks/useScrollLock";

type WysiwygImageProps = {
  image: WysiwygModalImageProps;
  figCaption?: string;
};

const WysiwygImage = ({ image, figCaption }: WysiwygImageProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { id, src, alt, width, height } = image;
  const isPortrait = height > width; //- 縦長の画像か否か

  const dialogRef = useRef<HTMLDialogElement>(null);

  // スクロールロック（モーダル開閉状態に基づく）
  useScrollLock({ isLocked: isModalOpen });

  // 画像モーダルを開く処理
  const handleOpenModal = (
    e:
      | React.MouseEvent<
          HTMLImageElement | HTMLDivElement | HTMLButtonElement,
          MouseEvent
        >
      | React.KeyboardEvent<HTMLImageElement>
  ) => {
    if ("key" in e) if (e.key !== "Enter" && e.key !== " ") return;

    e.stopPropagation();
    e.preventDefault();
    startTransition(() => setModalOpen(true));
  };

  // 画像モーダルを閉じる処理
  const handleCloseModal = () => {
    startTransition(() => setModalOpen(false));
  };

  // stateに追従してdialogの開閉を反映する
  // View Transitionのスナップショットがdialogの開いた状態で撮影されるよう、
  // showModal/closeはstate更新後のコミット内で実行する
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isModalOpen]);

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
              onClick={handleOpenModal}
              onKeyDown={handleOpenModal}
              style={{ aspectRatio: `${width}/${height}` }}
              className={cn(
                "mx-auto cursor-pointer rounded-sm outline-none",
                "focus-visible:shadow-lg",
                isPortrait
                  ? "max-h-130 w-auto max-w-full md:h-130"
                  : "h-auto w-130 max-w-full"
              )}
              tabIndex={0}
            />
          </ViewTransition>
        )}
      </ClickableImage>

      {/* モーダル要素 */}
      <dialog
        ref={dialogRef}
        onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
          if (e.target === e.currentTarget) {
            handleCloseModal();
          }
        }}
        onCancel={(e: React.SyntheticEvent<HTMLDialogElement>) => {
          // Escキーによる即時closeを抑止し、View Transition経由で閉じる
          e.preventDefault();
          handleCloseModal();
        }}
        onClose={() => {
          // 想定外の経路でcloseされた場合にstateを同期するフォールバック
          startTransition(() => setModalOpen(false));
        }}
        style={{ aspectRatio: `${width}/${height}` }}
        className={cn(
          "m-auto h-auto max-h-[80%] w-auto max-w-[80%] bg-transparent",
          "backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        )}
      >
        {isModalOpen && (
          <ViewTransition name={`wysiwyg-thumb-${id}`}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-full object-contain"
            />
          </ViewTransition>
        )}
        <ButtonClose
          label="閉じる"
          handleClick={handleCloseModal}
          className="fixed top-4 right-4"
        />
      </dialog>
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
