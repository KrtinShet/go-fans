import React from "react";
import DashboardLayout from "../Dashboard";
import {
  useGetAllCreatorFeedsQuery,
  useDeleteFeedMutation,
} from "./../../store/api/feedsApiSlice";
import { useSelector } from "react-redux";
import PostCard from "./../FeedsPage/Components/PostCard";
import { Box, Button } from "@mui/material";

function Index() {
  const authState = useSelector((state) => state.auth);
  const { data: postsData } = useGetAllCreatorFeedsQuery(authState.userId);

  const [deleteFeed] = useDeleteFeedMutation();

  const handleDelete = async (id) => {
    await deleteFeed(id);
  };

  return (
    <DashboardLayout>
      {postsData?.feeds.map((post) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <PostCard key={post._id} feed={post} />
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </Button>
          <Button sx={{ ml: 2, mt: 2 }} variant="outlined" color="info">
            edit
          </Button>
        </Box>
      ))}
    </DashboardLayout>
  );
}

export default Index;
