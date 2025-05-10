import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import {
  CharacterSchema,
  getCharactersInfiniteQueryOptions,
  getVoiceActorsInfiniteQueryOptions,
  getWatchablesInfiniteQueryOptions,
  VoiceActorSchema,
  WatchableSchema,
} from "@/lib/services/gen";
import WithScroller from "@/components/hoc/with-scroller";
import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/utils";
const mapper = {
  characters: {
    options: getCharactersInfiniteQueryOptions,
    typeGuard: (data: unknown): data is CharacterSchema => true, // Implemente a validação real
  },
  "voice-actors": {
    options: getVoiceActorsInfiniteQueryOptions,
    typeGuard: (data: unknown): data is VoiceActorSchema => true,
  },
  watchables: {
    options: getWatchablesInfiniteQueryOptions,
    typeGuard: (data: unknown): data is WatchableSchema => true,
  },
} as const;
type Props<T extends keyof typeof mapper> = { 
  namespace: T;
};

// Helper para extrair o tipo da query
type InferDataFromQueryOptions<T> = T extends ReturnType<typeof getCharactersInfiniteQueryOptions> 
  ? CharacterSchema
  : T extends ReturnType<typeof getVoiceActorsInfiniteQueryOptions> 
  ? VoiceActorSchema 
  : T extends ReturnType<typeof getWatchablesInfiniteQueryOptions> 
  ? WatchableSchema
  : never;

export default async function WikiEntityList<T extends keyof typeof mapper>({ namespace }: Props<T>) {
  const queryClient = new QueryClient();
  const { options: getQueryOptions, typeGuard } = mapper[namespace];
  const queryOptions = getQueryOptions();

  // Prefetch seguro
  await queryClient.prefetchInfiniteQuery(queryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
        <WithScroller<InferDataFromQueryOptions<T>>
          queryOptions={queryOptions}
          render={(data) => (
            <Link key={data.id} href={`/wiki/${data.id}`}>
              <div className="border rounded-md flex overflow-hidden">
                <div className="w-1/3 h-24 relative">
                  <Image
                    alt=""
                    src={data.cover_url || PLACEHOLDER_IMAGE}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <h2 className="text-lg font-bold">{data.name}</h2>
                  <p className="truncate">{data.summary}</p>
                </div>
              </div>
            </Link>
          )}
        />
      </div>
    </HydrationBoundary>
  );
}
