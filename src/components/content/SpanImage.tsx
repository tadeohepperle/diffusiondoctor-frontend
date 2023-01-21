import { GenImage } from "@data/genImage";
import { genImagePath } from "@utils/utils";
import { useState } from "react";
import { ImageModal } from "./ImageModal";

export default function SpanImage(props: {
  image: GenImage | string;
  title?: string;
  details?: boolean;
  aspect?: "3/1" | "2/1" | "video" | "square";
  interactive?: boolean;
}): JSX.Element {
  const [modalShown, setModalShown] = useState(false);
  const aspectClass = props.aspect
    ? {
        "3/1": "aspect-3/1",
        "2/1": "aspect-2/1",
        video: "aspect-video",
        square: "aspect-square",
      }[props.aspect]
    : "";
  const { image, title } = props;

  if (typeof image === "string") {
    return <img src={image} className={`w-full ${aspectClass}`}></img>;
  }
  const details = props.details ?? true;
  const interactive = props.interactive ?? typeof image !== "string";

  const badge = (label: string, value: any) => (
    <div className="mt-1 mr-2 inline-block px-2 group-hover:bg-opacity-80 bg-white bg-opacity-0 text-gray-800 dark:text-gray-200 dark:bg-black rounded">
      <span className="label">{label}: </span>
      {value}
    </div>
  );

  function showModal() {
    console.log("show");
    setModalShown(true);
  }
  function closeModal() {
    setModalShown(false);
  }

  const imageUrl = genImagePath(image);
  return (
    <figure className="m-0">
      <div className={`relative group prose-base`}>
        <img
          onClick={showModal}
          alt={image.prompt}
          src={imageUrl}
          className={`m-0 w-full ${aspectClass ?? "aspect-square"} ${
            interactive ? "cursor-pointer" : ""
          }`}></img>
        {details && (
          <div className="max-w-md absolute bottom-0 left-0 group-hover:opacity-100 opacity-0 text-xs md:text-sm ml-2 mb-2">
            {badge("prompt", image.prompt || "none")}
            {image.negative_prompt &&
              badge("negative prompt", image.negative_prompt)}
            {badge("size", `${image.width} x ${image.height}`)}
            {badge("seed", image.seed)}
            {badge("steps", image.num_inference_steps)}
            {image.guidance_scale &&
              badge("guidance_scale", image.guidance_scale)}
            {image.prompt_strength &&
              badge("prompt_strength", image.prompt_strength)}
            {image.sampler_name && badge("sampler", image.sampler_name)}
            {image.stable_diffusion_model &&
              badge("model", image.stable_diffusion_model)}
          </div>
        )}
        {details && (
          <div className="absolute bottom-0 left-0 group-hover:hidden opacity-100 text-xs md:text-sm ml-2 mb-2">
            <div className="rounded px-2 text-center shadow pill opacity-80 bg-white text-gray-800 dark:text-gray-200 dark:bg-black">
              details
            </div>
          </div>
        )}
      </div>
      {title && (
        <figcaption className="mt-1 mb-2 text-center text-sm">
          {title}
        </figcaption>
      )}

      {interactive && modalShown && (
        <ImageModal image={image} title={title} closeModal={closeModal} />
      )}
    </figure>
  );
}
