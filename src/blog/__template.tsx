import { authors } from "@data/authors";
import { BlogPost, BlogPostData, BlogPostVisual } from "@data/blogPost";
import { categories } from "@data/category";

const data: BlogPostData = {
  title: "__________",
  excerpt: "________",
  publishDate: "2023-01-18",
  image: "public/images/misc/default_post_header_image.jpeg",
  category: categories.challenge,
  author: authors.tadeoHepperle,
  tags: ["monster", "stable diffusion"],
};

const visual: BlogPostVisual = (pageData: BlogPostData) => {
  return (
    <div>
      Hello this is blog
      <br />
      THis is title: {pageData.title}
    </div>
  );
};

export const post: BlogPost = { visual, data };
