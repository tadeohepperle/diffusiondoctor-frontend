import {
  BlogPostNoSlug,
  BlogPostDataNoSlug,
  dataWithSlug,
} from "./../data/blogPost";
import { BlogPost } from "@data/blogPost";
import fs from "fs";
import path from "path";

export async function getAllPosts(
  includingDrafts: boolean = false
): Promise<BlogPost[]> {
  const blogPostFilesFunctionsObject = import.meta.glob("/blog/*.astro");
  const importFutures = Object.keys(blogPostFilesFunctionsObject).map((k) =>
    (async () => {
      const slug = path.parse(k).name;
      const imports: any = await blogPostFilesFunctionsObject[k]();
      if (!includingDrafts && imports.draft === true) {
        return undefined;
      }
      const blogPostDataNoSlug = imports.data as BlogPostDataNoSlug;
      const blogPostData = dataWithSlug(blogPostDataNoSlug, slug);
      const blogPost: BlogPost = {
        data: blogPostData,
        visual: imports.default,
        relatedPosts: [],
      };
      return blogPost;
    })()
  );
  const blogPosts = (await Promise.all(importFutures)).filter(
    (e) => e !== undefined
  ) as BlogPost[];
  // fill relatedposts:

  for (let i = 0; i < blogPosts.length; i++) {
    for (let j = 0; j < blogPosts.length; j++) {
      if (i !== j) {
        blogPosts[i].relatedPosts.push(blogPosts[j].data);
      }
    }
  } // TODO: fix this, this is too simple!!! And inefficient later on

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
