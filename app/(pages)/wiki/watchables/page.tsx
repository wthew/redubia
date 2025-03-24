import { getWatchables } from "@/lib/services/gen";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
export default async function Page() {
  const dataWatchables = await getWatchables();

  return (
    <div>
      <h1>Watchables</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataWatchables.map((watchable) => (
          <Link key={watchable.id} href={`/wiki/watchables/${watchable.id}`}>
            <div className="p-4 border rounded-md">
              <h2 className="text-lg font-bold">{watchable.name}</h2>
              <p>{"watchable.description"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

