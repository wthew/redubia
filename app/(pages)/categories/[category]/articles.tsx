"use client";

import { useGetPagesByCategory } from "@/lib/services/gen";
// import InfiniteScroller from "../../../components/infinity-scroller";
import MediaWikiCard from "../../../components/media-wiki-card";

export default function Articles({ id }: { id: number }) {
  const { data } = useGetPagesByCategory({ id, params: {} });
  const results = (data?.results || [])

  return (
    <div>
      {/* <InfiniteScroller infinite={infinite}> */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          {results.map((item) => (
            <MediaWikiCard key={item.id} item={item} />
          ))}
        </div>
      {/* </InfiniteScroller> */}
    </div>
  );
}
