"use client";

import InfiniteScroller from "@/components/infinity-scroller";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DubbingCastFromCharacterSchema,
  DubbingCastFromVoiceActorSchema,
  DubbingCastFromWatchableSchema,
  WikiEntitySchema,
  WikiEntitySchemaNamespaceEnum,
} from "@/lib/services/gen";
import Link from "next/link";
import { mapper } from "./utils";
import {
  InfiniteQueryObserverOptions,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import EntityThumbnail from "../entity-thumbnail";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PropsWithChildren, useMemo } from "react";
import { compact } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";

type PopoverProps = {
  relations?: Pick<WikiEntitySchema, "name" | "id">[];
};
export function PopoverRelations(props: PropsWithChildren<PopoverProps>) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="cursor-pointer hover:underline underline-offset-4"
      >
        {props.children}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="grid gap-4">
          {props.relations?.map((item) => (
            <div key={item?.id} className="flex flex-row gap-2">
              <Link
                href={`/wiki/${item?.id}`}
                className="text-sm font-bold hover:underline"
              >
                {item?.name}
              </Link>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DubbingCastFromWatchableItem(p: DubbingCastFromWatchableSchema) {
  const { dubbing_cast, character } = p;
  const relations = compact(dubbing_cast?.map((item) => item.voice_actor));

  return (
    <Card title={character?.name}>
      <CardHeader className="flex flex-row gap-4 items-center">
        <EntityThumbnail item={character!} />
        <div className="flex flex-col overflow-hidden">
          <CardTitle className="truncate cursor-pointer hover:underline underline-offset-4">
            {character?.name}
          </CardTitle>
          <PopoverRelations relations={relations}>
            <span>Ver todas as Vozes</span>
          </PopoverRelations>
        </div>
      </CardHeader>
    </Card>
  );
}

function DubbinCastFromCharacterItem(p: DubbingCastFromCharacterSchema) {
  const { dubbing_cast, watchable } = p;
  const relations = compact(dubbing_cast?.map((item) => item.voice_actor));

  return (
    <Card title={watchable?.name}>
      <CardHeader className="flex flex-row gap-4 items-center">
        <EntityThumbnail item={watchable!} />
        <div className="flex flex-col overflow-hidden">
          <CardTitle className="truncate cursor-pointer hover:underline underline-offset-4">
            {watchable?.name}
          </CardTitle>
          <PopoverRelations relations={relations}>
            <span>Ver todas as Vozes</span>
          </PopoverRelations>
        </div>
      </CardHeader>
    </Card>
  );
}

function DubbingCastFromVoiceActorItem(p: DubbingCastFromVoiceActorSchema) {
  const { dubbing_cast, character } = p;
  const relations = compact(dubbing_cast?.map((item) => item.watchable));

  return (
    <Card title={character?.name}>
      <CardHeader className="flex flex-row gap-4 items-center">
        <EntityThumbnail item={character!} />
        <div className="flex flex-col overflow-hidden">
          <CardTitle className="truncate cursor-pointer hover:underline underline-offset-4">
            {character?.name}
          </CardTitle>
          <PopoverRelations relations={relations}>
            <span>Ver todas as obras</span>
          </PopoverRelations>
        </div>
      </CardHeader>
    </Card>
  );
}

type Props<T extends WikiEntitySchemaNamespaceEnum> = {
  id: string;
  namespace: T;
};
export default function DubbingCastItems<
  T extends WikiEntitySchemaNamespaceEnum,
>({ id, namespace }: Props<T>) {
  const options = mapper[namespace]({ id, params: {} });
  type Options =
    typeof options extends InfiniteQueryObserverOptions<infer R> ? R : never;
  const infinite: UseInfiniteQueryResult<Options> = useInfiniteQuery(options);

  const title = useMemo(() => {
    switch (namespace) {
      case "watchable":
        return "Personagens";
      case "character":
        return "Obras";
      case "voice_actor":
        return "Personagens";
    }
  }, [namespace]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h5 className="text-lg font-bold">{title}</h5>
      </div>
      <InfiniteScroller infinite={infinite}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infinite.data?.pages?.map(({ data }) =>
            data?.map((pageData) => {
              switch (namespace) {
                case "watchable": {
                  const data = pageData as DubbingCastFromWatchableSchema;
                  const key = data.character?.id;
                  return <DubbingCastFromWatchableItem key={key} {...data} />;
                }
                case "character": {
                  const data = pageData as DubbingCastFromCharacterSchema;
                  const key = data.watchable?.id;
                  return <DubbinCastFromCharacterItem key={key} {...data} />;
                }
                case "voice_actor":
                  const data = pageData as DubbingCastFromVoiceActorSchema;
                  const key = data.character?.id;
                  return <DubbingCastFromVoiceActorItem key={key} {...data} />;
              }
            })
          )}
          {infinite.isLoading &&
            Array.from({ length: 10 }).map((_, i) => (
              <Card key={`loading-${i}`}>
                <CardHeader className="flex flex-row gap-4 items-center">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                </CardHeader>
              </Card>
            ))}
        </div>
      </InfiniteScroller>
    </div>
  );
}
