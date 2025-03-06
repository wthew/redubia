"use client";

import { useGetCategories } from "@/lib/services/gen";
// import InfiniteScroller from "../../components/infinity-scroller";
import MediaWikiCard from "../../components/media-wiki-card";

export default function Categories() {
  const { data } = useGetCategories({ params: {} });
  const results = data?.results || [];

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
