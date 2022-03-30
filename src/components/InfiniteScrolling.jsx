import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const InfiniteScrolling = ({ children, dataLength, next, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader=""
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {children}
    </InfiniteScroll>
  );
};
