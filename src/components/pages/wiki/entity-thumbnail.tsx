import { WikiEntitySchema } from "@/lib/services/gen";
import { PLACEHOLDER_IMAGE } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

type Props = {
  item: Pick<WikiEntitySchema, "id" | "name" | "cover_url">;
  size?: number;
  className?: string;
};
export default function EntityThumbnail({ item, size = 64, className }: Props) {
  const { id, name, cover_url } = item;
  const style: CSSProperties = {
    width: size,
    height: size,
    minHeight: size,
    minWidth: size,
  };

  return (
    <Link href={`/wiki/${id}`} style={style} className="relative">
      <Image
        style={{ ...style, objectFit: "cover" }}
        alt={name || ""}
        src={{ src: cover_url || PLACEHOLDER_IMAGE, width: size, height: size }}
        className={"rounded-full " + className}
      />
    </Link>
  );
}
