import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Articles from "./articles";
import { getPagesByCategoryQueryOptions } from "@/lib/services/gen";

type Params = Promise<{ category: number }>;
export default async function Page(props: { params: Params }) {
  const { category: id } = await props.params;
  const client = new QueryClient();

  await client.prefetchQuery(getPagesByCategoryQueryOptions({ id }));

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
