import NextImage from "next/image";
import { ImageFile } from "../../services/gen";
import { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof NextImage>, "src"> & {
  image: ImageFile;
};
export default function Image({ image, ...props }: Props) {
  const { height, source, width } = image;
  return <NextImage {...props} src={{ src: source, height, width }} />;
}
