export type Blog = {
  id: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  category: Category;
  thumbnail: Thumbnail;
  body: string;
};

export type BlogArticle = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  category: Category;
  thumbnail: Thumbnail;
  body: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

export type LinkButtonProps = {
  children: React.ReactNode;
  link: {
    href: string;
    blank?: boolean;
  };
  handleClick?: never;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = {
  children: React.ReactNode;
  link?: never;
  handleClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
