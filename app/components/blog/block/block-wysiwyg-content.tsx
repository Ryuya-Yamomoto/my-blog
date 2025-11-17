import parse from "html-react-parser";

import ParseWysiwyg from "@/utils/blog/post/parseWysiwyg";

const BlockWysiwygContent = ({ html }: { html: string }): React.ReactNode => {
  // 渡されたwysiwygのHTMLをパース
  const parsedArticleBody = ParseWysiwyg(html);

  return parse(parsedArticleBody);
};

export default BlockWysiwygContent;
