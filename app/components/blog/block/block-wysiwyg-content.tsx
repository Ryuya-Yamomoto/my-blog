import parse, { DOMNode, Element } from "html-react-parser";
import { v4 as uuidv4 } from "uuid";

import ParseWysiwyg from "@/utils/blog/post/parseWysiwyg";

import WysiwygImage from "../wysiwyg/wysiwyg-image";
import WysiwygMokujiBlock from "../wysiwyg/wysiwyg-mokuji-block";

const BlockWysiwygContent = ({ html }: { html: string }): React.ReactNode => {
  // 渡されたwysiwygのHTMLをパース
  const parsedArticleBody = ParseWysiwyg(html);

  // ReactNodeに置換
  // figure → onClickイベントを付与
  // h2 → idを付与 / h2要素の情報を用いて目次を生成
  const arrayMokuji: { id: string; text: string }[] = [];
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

        const id = uuidv4();
        const text = getTextContent(domNode);
        arrayMokuji.push({ id, text });

        // 目次のアクティブ判定は WysiwygMokujiBlock がスクロール位置から行う
        return <h2 id={id}>{text}</h2>;
      }

      // その他の要素はそのまま返す
      return domNode;
    },
  });

  return (
    <>
      {parsedReactNode}
      <WysiwygMokujiBlock arrayMokuji={arrayMokuji} />
    </>
  );
};

export default BlockWysiwygContent;
