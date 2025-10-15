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
