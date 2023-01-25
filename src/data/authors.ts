export interface Author {
  name: string;
  slug: string;
  image: string;
  bio: string;
}

export const authors = {
  tadeoHepperle: {
    name: "Tadeo Hepperle",
    slug: "tadeo-hepperle",
    image: "./src/assets/authors/tadeo_hp_lq.jpg",
    bio: "Hey, I am Tadeo, a Software Developer with a passion for Rust, Dart and Deep Learning. I love to explore how to make use of generative AI, especially for games.",
  } as Author,
};
