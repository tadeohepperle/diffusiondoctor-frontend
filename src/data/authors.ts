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
    bio: "Tadeo Hepperle is a Software Developer with a passion for Rust, Dart and Deep Learning. He loves to explore state of the art generative artificial intelligence models.",
  } as Author,
};
