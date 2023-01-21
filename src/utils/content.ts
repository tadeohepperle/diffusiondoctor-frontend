import {
  BlogPostNoSlug,
  BlogPostDataNoSlug,
  dataWithSlug,
} from "./../data/blogPost";
import { BlogPost } from "@data/blogPost";
import fs from "fs";
import path from "path";

export async function getAllPosts(): Promise<BlogPost[]> {
  const blogPostFilesFunctionsObject = import.meta.glob("/blog/*.astro");
  const importFutures = Object.keys(blogPostFilesFunctionsObject).map((k) =>
    (async () => {
      const slug = path.parse(k).name;
      const imports: any = await blogPostFilesFunctionsObject[k]();
      const blogPostDataNoSlug = imports.data as BlogPostDataNoSlug;
      const blogPostData = dataWithSlug(blogPostDataNoSlug, slug);
      const blogPost: BlogPost = {
        data: blogPostData,
        visual: imports.default,
      };
      return blogPost;
    })()
  );
  const blogPosts = await Promise.all(importFutures);
  return blogPosts;
}

export const getLatestPosts = async (
  limit: number = 10
): Promise<BlogPost[]> => {
  const allPosts: BlogPost[] = await getAllPosts();
  allPosts.sort(
    (a, b) =>
      new Date(b.data.publishDate).valueOf() -
      new Date(a.data.publishDate).valueOf()
  );

  return allPosts.slice(0, limit);
};
