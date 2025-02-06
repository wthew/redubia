"use client";

import InfiniteScroller from "../../lib/components/infinity-scroller";
import MediaWikiCard from "../../lib/components/media-wiki-card";
import { useGetPagesByCategoryInfinite } from "../../lib/services/gen";

export default function Articles({ id }: { id: number }) {
  const { data, ...infinite } = useGetPagesByCategoryInfinite({ id, params: {} });
  const results = (data?.pages || []).flatMap(({ results }) => results || []);
  console.log({ results });

  return (
    <div>
      <InfiniteScroller infinite={infinite}>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          {results.map((item) => (
            <MediaWikiCard key={item.id} item={item} />
          ))}
        </div>
      </InfiniteScroller>
    </div>
  );
}
