import InfiniteScroller from "../infinity-scroller";
import {
  useInfiniteQuery,
  InfiniteQueryObserverOptions,
  InfiniteData,
} from "@tanstack/react-query";
import { JSX } from "react";

type WithScrollerProps<TItem> = {
  queryOptions: Omit<
    InfiniteQueryObserverOptions<InfiniteData<TItem>>,
    "queryKey"
  >;
  render: (item: TItem) => JSX.Element;
};

export default function WithScroller<TItem>(props: WithScrollerProps<TItem>) {
  const { queryOptions, render } = props;
  
  const { data, ...infinite } = useInfiniteQuery({
    ...queryOptions,
    queryKey: [""],
  });

  return (
    <InfiniteScroller infinite={infinite}>
      {data?.pages.map(render)}
    </InfiniteScroller>
  );
}
