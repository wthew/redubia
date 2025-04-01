import {
  getCharacters,
  getVoiceActors,
  getWatchables,
  WikiEntitySchema,
} from "@/lib/services/gen";
import { PLACEHOLDER_IMAGE } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: WikiEntitySchema[];
}

const getDataMapper = {
  characters: getCharacters,
  "voice-actors": getVoiceActors,
  watchables: getWatchables,
} as const;

export async function getData<T extends keyof typeof getDataMapper>(
  fn: T,
  ...opts: Parameters<(typeof getDataMapper)[T]>
) {
  return getDataMapper[fn](...opts);
}

export default function WikiWikiEntityList({ data }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
        {data.map((data) => (
          <Link key={data.id} href={`/wiki/${data.id}`} >
            <div
              className="border rounded-md flex overflow-hidden"
              title={data.summary}
            >
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
        ))}
      </div>
    </div>
  );
}
