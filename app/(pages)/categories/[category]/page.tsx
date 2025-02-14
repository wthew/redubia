import { getPagesByCategoryInfiniteQueryOptions } from "@/services/gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Articles from "./articles";

type Params = Promise<{ category: number }>;
export default async function Page(props: { params: Params }) {
  const { category: id } = await props.params;
  const client = new QueryClient();

  await client.prefetchInfiniteQuery(
    getPagesByCategoryInfiniteQueryOptions({ id, params: {} })
  );

  return (
    <div className="flex flex-col items-center">
      <div className="p-5 w-full max-w-5xl">
        <HydrationBoundary state={dehydrate(client)}>
          <Articles id={id} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
