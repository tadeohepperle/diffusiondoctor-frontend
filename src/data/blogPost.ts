import { Category } from "./category";
import { Author } from "./authors";

export type BlogPostData = {
  title: string;
  excerpt: string;
  publishDate: string; // "2023-01-18"
  image: string;
  category: Category;
  author: Author;
  tags: string[];
};

export type BlogPostVisual = (data: BlogPostData) => JSX.Element;

export type BlogPost = {
  data: BlogPostData;
  visual: BlogPostVisual;
};
