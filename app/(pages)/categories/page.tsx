import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Categories from "./categories";
import { getCategoriesQueryOptions } from "@/lib/services/gen";

export default async function Page() {
  const client = new QueryClient();

  await client.prefetchQuery(getCategoriesQueryOptions({}));

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
