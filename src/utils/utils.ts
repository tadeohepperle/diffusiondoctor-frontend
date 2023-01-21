import { GenImage } from "./../data/genImage";
// import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/** Format Date */
export const getFormattedDate = (date: string): string =>
  date
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

// /** Estimated Reading time */

// export function remarkReadingTime() {
//   return function (tree, { data }) {
//     const textOnPage = toString(tree);
//     const readingTime = getReadingTime(textOnPage);

//     data.astro.frontmatter.estReadingTime = readingTime.minutes;
//   };
// }

/** Check if an Image Path is Relative or Absolute */
export const checkImageUrl = (image, url) => {
  try {
    new URL(image);
    return image;
  } catch (error) {
    return new URL(image, url).toString();
  }
};

export const PLACEHOLDER_IMAGE =
  "https://assets.dicebreaker.com/dnd-5e-strixhaven-curriculum-of-chaos-artwork-2.jpg/BROK/thumbnail/1600x900/quality/100/dnd-5e-strixhaven-curriculum-of-chaos-artwork-2.jpg";

export function genImagePath(
  genImage: GenImage,
  sr: "string" | undefined = undefined
): string {
  return `/images/generated/ui/${genImage.session}/${genImage.slug}.jpeg`;
}
export function genImagePathSR(
  genImage: GenImage,
  sr: "string" | undefined = undefined
): string {
  return `/images/generated/ui/${genImage.session}/${genImage.slug}SR4.jpeg`;
}

export const PROSE_DEFAULT =
  "prose prose-base md:prose-xl lg:prose:xl dark:prose-invert prose-a:text-cyan-500 dark:prose-a:text-cyan-300";
