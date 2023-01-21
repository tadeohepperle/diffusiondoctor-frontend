import { GenImage } from "@data/genImage";

export const ImageModal = (props: {
  image: GenImage | string;
  title?: string;
  closeModal: () => void;
}): JSX.Element => {
  const { title, image, closeModal } = props;
  return (
    <>
      <div className="modal">
        {title}
        <div className="modal-guts">{"lul"}</div>
      </div>
      <div className="modal-overlay" onClick={closeModal}></div>
    </>
  );
};
