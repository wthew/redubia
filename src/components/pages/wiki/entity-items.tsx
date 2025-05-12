"use client";

import InfiniteScroller from "@/components/infinity-scroller";
import { WikiEntitySchema } from "@/lib/services/gen";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { mapper, Schemas } from "./utils";

type Props<T extends keyof Schemas> = { query: T };
export default function WikiEntityItems<T extends keyof Schemas>(p: Props<T>) {
  const options = mapper[p.query]({});
  const infinite = useInfiniteQuery(options);

  return (
    <InfiniteScroller infinite={infinite}>
      {infinite.data?.pages.map(({ data = [] }) =>
        data.map((item) => <WikiEntityItem key={item.id} {...item} />)
      )}
    </InfiniteScroller>
  );
}

function WikiEntityItem(props: WikiEntitySchema) {
  return (
    <Link key={props.id} href={`/wiki/${props.id}`}>
      <div
        className="border rounded-md flex overflow-hidden"
        title={props.summary}
      >
        {/* <div className="w-1/3 h-24 relative">
          <Image
            alt=""
            src={props.cover_url || PLACEHOLDER_IMAGE}
            fill
            className="object-cover"
          />
        </div> */}

        <div className="w-2/3 p-4">
          <h2 className="text-lg font-bold">{props.name}</h2>
          <p className="truncate">{props.summary}</p>
        </div>
      </div>
    </Link>
  );
}
