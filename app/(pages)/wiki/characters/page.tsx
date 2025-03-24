import { getCharacters } from "@/lib/services/gen";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
export default async function Page() {
  const dataCharacters = await getCharacters();

  return (
    <div>
      <h1>Characters list</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataCharacters.map((character) => (
          <Link key={character.id} href={`/wiki/characters/${character.id}`}>
            <div className="p-4 border rounded-md">
              <h2 className="text-lg font-bold">{character.name}</h2>
              <p>{"character.description"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

