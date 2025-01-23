import Image from "next/image";
import callApi from "@/app/lib/services/api";
import { ImageResponse } from "@/app/lib/types/api";
import Link from "next/link";

export default async function Gallery(props: { page_id: string }) {
  const res = await callApi(
    `/gallery/${props.page_id}?size=${48 * 2}`,
    (r) => r.json() as unknown as ImageResponse[]
  );

  return (
    <div className="flex flex-row gap-3 items-center">
      {res.map(({ original, thumbnail, pageid, title, pageimage }) => (
        <Link key={pageid} href={`/${pageid}`}>
          <Image
            className="rounded-lg hover:scale-125 transition-transform"
            title={pageimage}
            alt={""}
            src={{ src: thumbnail.source, height: 56, width: 56 }}
          />
        </Link>
      ))}
      <Link href={`/${props.page_id}/gallery`}>Ver mais...</Link>
    </div>
  );
}
