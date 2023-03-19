import React from "react";

import PostCard from "./PostCard";

import { useGetFeedsQuery } from "./../../../store/api/feedsApiSlice";
import { Box } from "@mui/material";

function FeedPosts() {
  const { data, error, isLoading } = useGetFeedsQuery();

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data?.feeds.map((feed) => (
            <PostCard key={feed.id} feed={feed} />
          ))}
        </Box>
      )}
    </div>
  );
}

export default FeedPosts;
