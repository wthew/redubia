import {
  getCharactersInfiniteQueryOptions,
  GetCharactersQueryResponse,
  getVoiceActorsInfiniteQueryOptions,
  GetVoiceActorsQueryResponse,
  getWatchablesInfiniteQueryOptions,
  GetWatchablesQueryResponse,
} from "@/lib/services/gen";
import {
  InfiniteData,
  InfiniteQueryObserverOptions,
} from "@tanstack/react-query";

export type Schemas = {
  characters: GetCharactersQueryResponse;
  "voice-actors": GetVoiceActorsQueryResponse;
  watchables: GetWatchablesQueryResponse;
};

export type Response<T> = InfiniteQueryObserverOptions<
  T,
  Error,
  T,
  T,
  readonly unknown[],
  unknown
>;
export const mapper = {
  characters: getCharactersInfiniteQueryOptions as unknown,
  "voice-actors": getVoiceActorsInfiniteQueryOptions as unknown,
  watchables: getWatchablesInfiniteQueryOptions as unknown,
} as { [K in keyof Schemas]: (_?: unknown) => Response<InfiniteData<Schemas[K]>> };
