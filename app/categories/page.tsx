import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCategoriesInfiniteQueryOptions } from "../lib/services/gen";
import Categories from "./categories";

export default async function Page() {
  const client = new QueryClient();

  await client.prefetchInfiniteQuery(getCategoriesInfiniteQueryOptions({}));

  return (
    <div className="flex flex-col items-center">
      <div className="p-5 w-full max-w-5xl">
        <HydrationBoundary state={dehydrate(client)}>
          <Categories />
        </HydrationBoundary>
      </div>
    </div>
  );
}
