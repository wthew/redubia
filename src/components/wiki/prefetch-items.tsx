import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import WikiEntityItems from "./entity-items";
import { mapper, Schemas } from "./utils";

type Props<T extends keyof Schemas> = { query: T };
export default async function WikiEntityList<T extends keyof Schemas>(
  p: Props<T>
) {
  const client = new QueryClient();

  const queryOptions = mapper[p.query]({ params: {} });
  client.prefetchInfiniteQuery(queryOptions);

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <WikiEntityItems query={p.query} />
    </HydrationBoundary>
  );
}
