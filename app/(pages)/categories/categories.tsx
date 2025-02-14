"use client";

import InfiniteScroller from "../../components/infinity-scroller";
import MediaWikiCard from "../../components/media-wiki-card";
import { useGetCategoriesInfinite } from "../../services/gen";

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
