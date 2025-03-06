import { ImageSourceFile } from "@/lib/services/gen";
import NextImage from "next/image";
import { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof NextImage>, "src"> & {
  image: ImageSourceFile;
};
export default function Image({ image, ...props }: Props) {
  const { height, source, width } = image;
  return <NextImage {...props} src={{ src: source, height, width }} />;
}
