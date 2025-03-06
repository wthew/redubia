import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "../image";
import { WikiEntity } from "@/lib/services/gen";

type Props = { item: WikiEntity; prefix?: string };
export default function MediaWikiCard(props: Props) {
  const { thumbnail: thumb, title } = props.item;

  return (
    <Link title={title} href={getItemUrl(props.item)}>
      <Card className="hover:scale-105 shadow-card transition-all overflow-hidden">
        <Image className="w-full h-[8rem] object-cover" image={thumb} alt="" />
        <CardHeader>
          <CardTitle className="whitespace-nowrap text-ellipsis overflow-hidden">
            {title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

function getItemUrl({ id, ns }: Pick<Props["item"], "id" | "ns">) {
  if (ns === "article") return `/${id}`;
  return `${ns}/${id}`;
}
