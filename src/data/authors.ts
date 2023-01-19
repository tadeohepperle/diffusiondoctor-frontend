export interface Props {
  name: string;
  slug: string;
  image: string;
  bio: string;
}

export type Author = Props;

export const authors: Props[] = [
  {
    name: "Tadeo Hepperle",
    slug: "tadeo-hepperle",
    image: "./src/assets/authors/tadeo-hepperle-mask.jpeg",
    bio: "Tadeo Hepperle is a Software Developer with a passion for Rust, Dart and Deep Learning. He loves to explore state of the art generative artificial intelligence models.",
  },
];
