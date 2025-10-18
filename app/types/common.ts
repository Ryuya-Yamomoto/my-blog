export interface Blog {
  id: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  category: Category;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  body: string;
}

export interface Category {
  id: string;
  name: string;
}

export type BaseButtonProps = {
  label: string;
  className?: string;
};

export type LinkButtonProps = BaseButtonProps & {
  link: {
    href: string;
    blank?: boolean;
  };
  handleClick?: never;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = BaseButtonProps & {
  link?: never;
  handleClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
