import { getVoiceActors } from "@/lib/services/gen";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
export default async function Page() {
  const dataVoiceActors = await getVoiceActors();

  return (
    <div>
      <h1>Voice Actors List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataVoiceActors.map((actor) => (
          <Link key={actor.id} href={`/wiki/voice-actors/${actor.id}`}>
            <div className="p-4 border rounded-md">
              <h2 className="text-lg font-bold">{actor.name}</h2>
              <p>{"actor.description"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

