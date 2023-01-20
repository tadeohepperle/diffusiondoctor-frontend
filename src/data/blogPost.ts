import { post } from "./../blog/__template";
import { Category } from "./category";
import { Author } from "./authors";

export type BlogPostDataNoSlug = {
  title: string;
  excerpt: string;
  publishDate: string; // "2023-01-18"
  image: string;
  category: Category;
  author: Author;
  tags: string[];
};

export type BlogPostData = {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string; // "2023-01-18"
  image: string;
  category: Category;
  author: Author;
  tags: string[];
};

export type BlogPostVisual = (data: BlogPostData) => JSX.Element;

export type BlogPostNoSlug = {
  data: BlogPostDataNoSlug;
  visual: BlogPostVisual;
};

export type BlogPost = {
  data: BlogPostData;
  visual: BlogPostVisual;
};

export function dataWithSlug(
  post: BlogPostNoSlug,
  slugname: string
): BlogPostData {
  let o = { ...post.data };
  (o as any).slugname = slugname;
  return o as BlogPostData;
}

export function postWithSlug(post: BlogPostNoSlug, slugname: string): BlogPost {
  let oData = { ...post.data };
  (oData as any).slugname = slugname;
  return { visual: post.visual, data: oData } as BlogPost;
}
