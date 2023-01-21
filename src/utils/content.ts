import {
  BlogPostNoSlug,
  postWithSlug as postWithSlug,
} from "./../data/blogPost";
import { BlogPost } from "@data/blogPost";
import fs from "fs";
import path from "path";

export async function getAllPosts(): Promise<BlogPost[]> {
  const blogPostFiles = await import.meta.glob("../../blog/*.astro");
  console.log(blogPostFiles);
  let m = await import("../../blog/blogpost.  astro");
  console.log(m);-

  // let posts: BlogPost[] = [];
  // for (const fileName of blogPostFiles) {
  //   const slug = path.parse(fileName).name;
  //   const exports = await import(`../../blog/${slug}.tsx`);
  //   const postNoSlug: BlogPostNoSlug = exports.post;
  //   const post = postWithSlug(postNoSlug, slug);
  //   posts.push(post);
  // }
  return [];
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
