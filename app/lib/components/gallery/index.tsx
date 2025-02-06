import Image from "next/image";
import Link from "next/link";
import { getGallery } from "@/app/lib/services/gen";

export default async function Gallery(props: { page_id: number }) {
  const res = await getGallery({ id: props.page_id });
  console.log(res)

  return (
    <div className="flex flex-row gap-3 items-center">
      {res.map(({ thumbnail, id, title }) => (
        <Link key={id} href={`/${id}`}>
          <Image
            className="rounded-lg hover:scale-110 transition-transform"
            title={title}
            alt={""}
            src={{ src: thumbnail.source, height: 56, width: 56 }}
          />
        </Link>
      ))}
      <Link href={`/${props.page_id}/gallery`}>Ver mais...</Link>
    </div>
  );
}
