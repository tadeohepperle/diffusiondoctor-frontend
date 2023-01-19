export interface Props {
  title: string;
  slug: string;
  color: "green" | "blue" | "orange" | "purple" | "pink";
  description: string;
}
export type Category = Props;

export const categories: Props[] = [
  {
    title: "Style Studies",
    slug: "style-studies",
    color: "blue",
    description:
      "Exploring how to achieve style of image, for example different artists or dedicated style networks.",
  },
  {
    title: "Object Studies",
    slug: "object-studies",
    color: "orange",
    description:
      "How can we tweak our prompt to get different depictions of a fixed object that we want to generate?",
  },
  {
    title: "Challenge",
    slug: "challenge",
    color: "green",
    description:
      "Achieving a certain design goal with Stable Diffusion Models.",
  },
  {
    title: "Models and Parameters",
    slug: "style-studies",
    color: "purple",
    description:
      "Comparing different Stable Diffusion models with each other, tuning hyperparamters, discovering embeddings.",
  },
  {
    title: "Finetuning and Training",
    slug: "finetuning-and-training",
    color: "pink",
    description:
      "Exploring how we can fine tune Stable Diffusion models to suit our needs.",
  },
];
