export interface Category {
  title: string;
  slug:
    | "style-studies"
    | "object-studies"
    | "challenge"
    | "models-and-paramters"
    | "finetuning-and-training"
    | "discoveries";
  color: "green" | "blue" | "orange" | "purple" | "pink" | "red";
  description: string;
}

type slugsCamelCase =
  | "styleStudies"
  | "objectStudies"
  | "challenge"
  | "modelsAndParamters"
  | "finetuningAndTraining"
  | "dicoveries";
export const categories: Record<slugsCamelCase, Category> = {
  styleStudies: {
    title: "Style Studies",
    slug: "style-studies",
    color: "blue",
    description:
      "Exploring how to achieve style of image, for example different artists or dedicated style networks.",
  },
  objectStudies: {
    title: "Object Studies",
    slug: "object-studies",
    color: "orange",
    description:
      "How can we tweak our prompt to get different depictions of a fixed object that we want to generate?",
  },
  challenge: {
    title: "Challenge",
    slug: "challenge",
    color: "green",
    description:
      "Achieving a certain design goal with Stable Diffusion Models.",
  },
  modelsAndParamters: {
    title: "Models and Parameters",
    slug: "models-and-paramters",
    color: "purple",
    description:
      "Comparing different Stable Diffusion models with each other, tuning hyperparamters, discovering embeddings.",
  },
  finetuningAndTraining: {
    title: "Finetuning and Training",
    slug: "finetuning-and-training",
    color: "pink",
    description:
      "Exploring how we can fine tune Stable Diffusion models to suit our needs.",
  },
  dicoveries: {
    title: "Discoveries",
    slug: "discoveries",
    color: "red",
    description:
      "Exploring how we can fine tune Stable Diffusion models to suit our needs.",
  },
};
