"use client";

import InfiniteScroller from "@/components/infinity-scroller";
import { WikiEntity } from "@/lib/services/gen";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mapper, Schemas } from "./utils";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import EntityThumbnail from "./entity-thumbnail";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

type Props<T extends keyof Schemas> = { query: T };
export default function WikiEntityItems<T extends keyof Schemas>(p: Props<T>) {
  const options = mapper[p.query]({ params: {} });
  const infinite = useInfiniteQuery(options);

  return (
    <InfiniteScroller
      infinite={infinite}
      className="grid grid-cols-2 md:grid-cols-3 gap-6"
    >
      {infinite.data?.pages.map(({ data = [] }) =>
        data.map((item) => <WikiEntityItem key={item.id} {...item} />)
      )}
      {infinite.isFetching &&
        Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-28 brightness-50 border rounded-xl w-full flex items-center justify-items-start"
          >
            <Skeleton className="mx-4 rounded-full h-20 w-20" />
            <div className="flex flex-col gap-2 w-1/2">
              <Skeleton className="rounded-lg h-6" />
              <Skeleton className="rounded-lg h-4" />
            </div>
          </Skeleton>
        ))}
    </InfiniteScroller>
  );
}

function WikiEntityItem(props: WikiEntity) {
  return (
    <Card title={props?.summary} className="p-0 h-28">
      <CardHeader className="flex flex-row gap-4 items-center">
        <EntityThumbnail item={props!} />
        <Link href={`/wiki/${props.id}`} className="flex-col overflow-hidden">
          <CardTitle className="truncate cursor-pointer hover:underline underline-offset-4">
            {props?.name}
          </CardTitle>
          <CardDescription className="truncate">
            {props?.summary}
          </CardDescription>
        </Link>
      </CardHeader>
    </Card>
  );
}
