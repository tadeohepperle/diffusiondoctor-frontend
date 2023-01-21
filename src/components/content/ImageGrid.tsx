import { GenImage } from "@data/genImage";
import { genImagePath } from "@utils/utils";
import SpanImage from "./SpanImage";

export default function ImageGrid(props: {
  xDim?: number;
  yDim?: number;
  images: (GenImage | string)[];
}): JSX.Element {
  let { xDim, yDim, images } = props;
  xDim = xDim || 4;

  {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {images.map((image, i) => {
          if (typeof image === "string") {
            return <div>Not implemented ERROR</div>;
          } else {
            return (
              <SpanImage image={image} details={true} title={image.prompt} />
            );
          }
        })}
      </div>
    );
  }
}
