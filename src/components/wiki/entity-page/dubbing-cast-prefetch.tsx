import { WikiEntityNamespaceEnum } from "@/lib/services/gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DubbingCastItems from "./dubbing-cast-items";
import { mapper } from "./utils";

type Props = { id: string; namespace: WikiEntityNamespaceEnum };
export default async function DubbingCast({ id, namespace }: Props) {
  const client = new QueryClient();
  const getOptions = mapper[namespace];

  const options = getOptions({ id, params: {} });
  client.prefetchInfiniteQuery(options);

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <DubbingCastItems id={id} namespace={namespace} />
    </HydrationBoundary>
  );
}
