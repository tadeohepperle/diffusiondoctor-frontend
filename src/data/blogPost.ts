import { Category } from "./category";
import { Author } from "./authors";

export type BlogPostDataNoSlug = {
  title: string;
  excerpt: string;
  publishDate: string; // "2023-01-18"
  image: string;
  imagelq?: string;
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
  imagelq?: string;
  category: Category;
  author: Author;
  tags: string[];
};

export type BlogPostVisual = (data: BlogPostData) => JSX.Element;

export type BlogPostNoSlug = {
  data: BlogPostDataNoSlug;
  visual: any;
};

export type BlogPost = {
  data: BlogPostData;
  visual: any;
  relatedPosts: BlogPostData[];
};

export function dataWithSlug(
  data: BlogPostDataNoSlug,
  slug: string
): BlogPostData {
  let o = { ...data };
  (o as any).slug = slug;
  return o as BlogPostData;
}

export function postWithSlug(post: BlogPostNoSlug, slug: string): BlogPost {
  let oData = { ...post.data };
  (oData as any).slug = slug;
  return { visual: post.visual, data: oData } as BlogPost;
}
