// export const Page = {
//   title: "Using Stable Diffusion to generate Monsters",
//   excerpt: "TODO",
//   publishDate: "2023-01-18",
//   image:
//     "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=927&h=927",
//   category: "object-studies",
//   author: "tadeo-hepperle",
//   tags: ["monster", "stable diffusion"],
//   content: [
//     `
// # Hello Peaple
//     `,
//   ],
// };

import ImageGrid from "@components/content/ImageGrid";
import SpanImage from "@components/content/SpanImage";
import { authors } from "@data/authors";
import {
  BlogPostData,
  BlogPostDataNoSlug,
  BlogPostNoSlug,
  BlogPostVisual,
} from "@data/blogPost";
import { categories } from "@data/category";
import { SESSIONS } from "@data/genImage";
import { md } from "@utils/markdown";
import { PLACEHOLDER_IMAGE } from "@utils/utils";

const data: BlogPostDataNoSlug = {
  title: "Using Stable Diffusion to generate Monsters",
  excerpt: "TODO",
  publishDate: "2023-01-18",
  image:
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=927&h=927",
  category: categories.challenge,
  author: authors.tadeoHepperle,
  tags: ["monster", "stable diffusion"],
};

const visual: BlogPostVisual = (pageData: BlogPostData) => {
  return (
    <div>
      {md`
# title 1

sahsahsa.\n
asa

> I was wondering what made him so angry

## Heading 2

This is a list:

- cool content
- usable for everything

| Table | lul   | whtas that |
| ----- | ----- | ---------- |
| ex1   | hahah | 122        |

www.google.com
      `}
      <ImageGrid
        images={[
          SESSIONS.PLACEHOLDER.placeholder,
          SESSIONS.PLACEHOLDER.placeholder,
          SESSIONS.PLACEHOLDER.placeholder,
          SESSIONS.PLACEHOLDER.placeholder,
        ]}
      />
      <SpanImage image={PLACEHOLDER_IMAGE} />
      Hello this is blog
      <SpanImage image={SESSIONS.PLACEHOLDER.placeholder} />
    </div>
  );
};

export const post: BlogPostNoSlug = { visual, data };