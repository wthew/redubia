import {
  DefaultError,
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
} from "@tanstack/react-query";
import React from "react";
import WikiEntityItems from "./entity-items";
import { mapper, Schemas } from "./utils";
import {
  GetCharacters200,
  GetVoiceActors200,
  GetWatchables200,
} from "@/lib/services/gen";

type Entities = GetCharacters200 | GetVoiceActors200 | GetWatchables200;

type Props<T extends keyof Schemas> = { query: T };
export default async function WikiEntityList<T extends keyof Schemas>(
  p: Props<T>,
) {
  const client = new QueryClient();

  const queryOptions = mapper[p.query]({ params: {} });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await client.prefetchInfiniteQuery({
    getNextPageParam: queryOptions.getNextPageParam,
    initialPageParam: queryOptions.initialPageParam,
    queryKey: queryOptions.queryKey,
    queryFn: queryOptions.queryFn as QueryFunction<
      Entities,
      typeof queryOptions.queryKey,
      number
    >,
    initialData: queryOptions.initialData,
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <WikiEntityItems query={p.query} />
    </HydrationBoundary>
  );
}
