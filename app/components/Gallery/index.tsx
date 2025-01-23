import Image from "next/image";
import fetchGallery from "@/app/lib/fetchGallery";

export default async function Gallery(props: { page_id: string }) {
  const galeria = await fetchGallery(props.page_id);

  return (
    <div>
      {galeria.map(({ original, thumbnail, pageid }) => (
        <Image
          key={pageid}
          alt={""}
          src={{
            src: thumbnail.source,
            height: thumbnail.height,
            width: thumbnail.width,
          }}
        />
      ))}
    </div>
  );
}
