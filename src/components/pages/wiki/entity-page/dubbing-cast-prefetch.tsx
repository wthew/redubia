import { CardHeader } from "../../../ui/card";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/utils";
import {
  getDubbingCastByCharacterIdInfiniteQueryOptions,
  WikiEntitySchemaNamespaceEnum,
} from "@/lib/services/gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DubbingCastItems from "./dubbing-cast-items";
import { mapper } from "./utils";

type Props = { id: string; namespace: WikiEntitySchemaNamespaceEnum };
export default async function DubbingCast({ id, namespace }: Props) {
  const client = new QueryClient();
  const getOptions = mapper[namespace]

  const options = getOptions({ id, params: {} });
  client.prefetchInfiniteQuery(options);

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <DubbingCastItems id={id} namespace={namespace} />
    </HydrationBoundary>
  );
}
