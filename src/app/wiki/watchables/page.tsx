import { getWatchables } from "@/lib/services/gen";
import { PLACEHOLDER_IMAGE } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
export default async function Page() {
  const dataWatchables = await getWatchables();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
        {dataWatchables.map((watchable) => (
          <Link key={watchable.id} href={`/wiki/watchables/${watchable.id}`}>
            <div className="border rounded-md flex overflow-hidden" title={watchable.summary}>
              <div className="w-1/3 h-24 relative">
                <Image alt="" src={watchable.cover_url || PLACEHOLDER_IMAGE} fill className="object-cover" />
              </div>

              <div className="w-2/3 p-4">
                <h2 className="text-lg font-bold">{watchable.name}</h2>
                <p className="truncate">{watchable.summary}</p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

