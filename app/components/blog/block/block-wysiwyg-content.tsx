import parse, { DOMNode, Element } from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

import ParseWysiwyg from "@/utils/blog/post/parseWysiwyg";

import WysiwygImage from "../wysiwyg/wysiwyg-image";

const BlockWysiwygContent = ({ html }: { html: string }): React.ReactNode => {
  // 渡されたwysiwygのHTMLをパース
  const parsedArticleBody = ParseWysiwyg(html);

  // ReactNodeに置換
  // figure → onClickイベントを付与
  // h2 → IntersectionObserver付与 / h2要素の情報を用いて目次を生成
  const parsedReactNode: React.ReactNode = parse(parsedArticleBody, {
    replace: (domNode: DOMNode) => {
      // figure
      if (domNode instanceof Element && domNode.name === "figure") {
        let img = null;
        let imgSrc = "";
        let imgAlt = "";
        let imgWidth = 0;
        let imgHeight = 0;
        let figCaption = null;
        let figCaptionText = "";

        img = domNode.children.find(
          (child) => child instanceof Element && child.name === "img"
        );
        if (img && img instanceof Element) {
          imgSrc = img.attribs.src;
          imgAlt = img.attribs.alt;
          imgWidth = Number(img.attribs.width) || 0;
          imgHeight = Number(img.attribs.height) || 0;
        }

        figCaption = domNode.children.find(
          (child) => child instanceof Element && child.name === "figcaption"
        );

        if (figCaption instanceof Element) {
          // figcaptionの中のテキストコンテンツを安全に取得
          const getTextContent = (element: Element): string => {
            return element.children
              .map((child) => {
                if (child.type === "text" && "data" in child) {
                  return child.data;
                } else if (child instanceof Element) {
                  return getTextContent(child);
                }
                return "";
              })
              .join("");
          };

          figCaptionText = getTextContent(figCaption);
        }

        // 取得した要素を用いて、変換をかける
        return (
          <WysiwygImage
            image={{
              id: uuidv4(),
              src: imgSrc,
              alt: imgAlt,
              width: imgWidth,
              height: imgHeight,
            }}
            figCaption={figCaptionText}
          ></WysiwygImage>
        );
      }

      // h2
      if (domNode instanceof Element && domNode.name === "h2") {
        // h2のテキストコンテンツを取得
        const getTextContent = (element: Element): string => {
          return element.children
            .map((child) => {
              if (child.type === "text" && "data" in child) {
                return child.data;
              } else if (child instanceof Element) {
                return getTextContent(child);
              }
              return "";
            })
            .join("");
        };

        const headingText = getTextContent(domNode);

        // カスタムh2コンポーネントに置き換え
        return <h2 className="custom-h2-class">{headingText}</h2>;
      }

      // その他の要素はそのまま返す
      return domNode;
    },
  });

  return (
    <div
      className={cn(
        "relative mt-8 grid pt-16",
        "before:bg-primary before:absolute before:top-0 before:left-1/2 before:h-px before:w-[40%] before:-translate-x-1/2 before:content-['']",
        "md:mt-24 md:px-4"
      )}
    >
      {/* この位置に目次ブロックが入ります。 ここのあるなしでhas()で親のレイアウト指定を分岐 */}
      <div className={cn("wysiwyg")}>{parsedReactNode}</div>
    </div>
  );
};

export default BlockWysiwygContent;
