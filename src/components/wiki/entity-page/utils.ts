import {
  getDubbingCastByCharacterIdInfiniteQueryOptions,
  GetDubbingCastByCharacterIdQueryResponse,
  getDubbingCastByVoiceActorIdInfiniteQueryOptions,
  GetDubbingCastByVoiceActorIdQueryResponse,
  getDubbingCastByWatchableIdInfiniteQueryOptions,
  GetDubbingCastByWatchableIdQueryResponse,
  WikiEntityNamespaceEnum,
} from "@/lib/services/gen";
import {
  InfiniteData,
  InfiniteQueryObserverOptions,
} from "@tanstack/react-query";

type Responses = {
  character: GetDubbingCastByCharacterIdQueryResponse;
  voice_actor: GetDubbingCastByVoiceActorIdQueryResponse;
  watchable: GetDubbingCastByWatchableIdQueryResponse;
};

export const mapper = {
  character: getDubbingCastByCharacterIdInfiniteQueryOptions,
  voice_actor: getDubbingCastByVoiceActorIdInfiniteQueryOptions,
  watchable: getDubbingCastByWatchableIdInfiniteQueryOptions,
} as {
  [K in WikiEntityNamespaceEnum]: (_: {
    params?: any;
    id: string;
  }) => InfiniteQueryObserverOptions<InfiniteData<Responses[K]>>;
};
