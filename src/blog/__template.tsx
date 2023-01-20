import { authors } from "@data/authors";
import {
  BlogPostData,
  BlogPostDataNoSlug,
  BlogPostNoSlug,
  BlogPostVisual,
} from "@data/blogPost";
import { categories } from "@data/category";

const data: BlogPostDataNoSlug = {
  title: "__________",
  excerpt: "________",
  publishDate: "2023-01-18",
  image: "public/images/misc/default_post_header_image.jpeg",
  category: categories.challenge,
  author: authors.tadeoHepperle,
  tags: ["_____"],
};

const visual: BlogPostVisual = (pageData: BlogPostData) => {
  return <div>_____________________</div>;
};

export const post: BlogPostNoSlug = { visual, data };
