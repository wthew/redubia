"use client";

import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";

type Props<TData = unknown> = React.HTMLAttributes<HTMLDivElement> & {
  infinite: Omit<UseInfiniteQueryResult<TData>, "data">;
};

const InfiniteScroller = React.forwardRef<HTMLDivElement, Props>(
  ({ infinite, children, ...props }, ref) => {
    const observerTarget = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          console.log(
            "indo chamar",
            entries[0]?.isIntersecting,
            infinite.hasNextPage
          );
          if (entries[0]?.isIntersecting && infinite.hasNextPage) {
            console.log("indo chamar");
            infinite.fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }

      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infinite]);

    return (
      <div ref={ref} {...props} style={{ overflowAnchor: "none" }}>
        {children}
        <div ref={observerTarget} />
      </div>
    );
  }
);

export default InfiniteScroller;
