import { BlogPost } from "@data/blogPost";
import fs from "fs";
import path from "path";

type BlogPostAndSlug = {
  slug: string;
  post: BlogPost;
};

export async function getAllPosts(): Promise<BlogPostAndSlug[]> {
  const blogPostFiles = fs.readdirSync("src/blog");
  let posts: { slug: string; post: BlogPost }[] = [];
  for (const fileName of blogPostFiles) {
    const slug = path.parse(fileName).name;
    const exports = await import(`../blog/${slug}`);
    const post: BlogPost = exports.post;
    console.log(post);
    posts.push({
      post,
      slug,
    });
  }
  return posts;
}

export const getLatestPosts = async (
  limit: number = 10
): Promise<BlogPostAndSlug[]> => {
  const allPosts: BlogPostAndSlug[] = await getAllPosts();
  allPosts.sort(
    (a, b) =>
      new Date(b.post.data.publishDate).valueOf() -
      new Date(a.post.data.publishDate).valueOf()
  );
  return allPosts.slice(0, limit);
};
