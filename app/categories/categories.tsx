"use client";

import InfiniteScroller from "../lib/components/infinity-scroller";
import MediaWikiCard from "../lib/components/media-wiki-card";
import { useGetCategoriesInfinite } from "../lib/services/gen";

export default function Categories() {
  const { data, ...infinite } = useGetCategoriesInfinite({ params: {} });
  const results = (data?.pages || []).flatMap(({ results }) => results || []);

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
