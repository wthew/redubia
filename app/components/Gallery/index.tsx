import Image from "next/image";
import callApi from "@/app/lib/services/api";
import { ImageResponse } from "@/app/lib/types/api";
import Link from "next/link";

export default async function Gallery(props: { page_id: string }) {
  const res = await callApi(
    `/gallery/${props.page_id}?size=48`,
    (r) => r.json() as unknown as ImageResponse[]
  );

  return (
    <div className="flex flex-row gap-3 mb-5 items-center">
      {res.map(({ original, thumbnail, pageid, title, pageimage }) => (
        <Link key={pageid} href={`/${pageid}`}>
          <Image
            className="rounded-lg hover:scale-125 transition-transform"
            title={pageimage}
            alt={""}
            src={{
              src: thumbnail.source,
              height: thumbnail.height,
              width: thumbnail.width,
            }}
          />
        </Link>
      ))}
      <Link href={`/${props.page_id}/gallery`}>Ver mais...</Link>
    </div>
  );
}
