import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, Send } from "@mui/icons-material";

import {
  useGetFeedQuery,
  useLikeFeedMutation,
  useUnlikeFeedMutation,
} from "./../../store/api/feedsApiSlice";
import {
  useGetPostCommentsQuery,
  // useUpdateCommentMutation,
  useCreateCommentMutation,
} from "./../../store/api/commentApiSlice";
import { useSelector } from "react-redux";

function Index() {
  const { feedId } = useParams();
  const [newComment, setNewComment] = useState("");
  const auth = useSelector((state) => state.auth);

  const { data: feedData } = useGetFeedQuery(feedId);
  const { data: commentData } = useGetPostCommentsQuery(feedId);

  // const [updateComment] = useUpdateCommentMutation();
  const [createComment] = useCreateCommentMutation();
  const [likeFeed] = useLikeFeedMutation();
  const [unlikeFeed] = useUnlikeFeedMutation();

  let isLiked = feedData?.feed.likes.includes(auth.userId);

  const handleLikeClick = () => {
    if (isLiked) {
      unlikeFeed(feedId);
    } else {
      likeFeed(feedId);
    }
  };

  const handleNewCommentSubmit = async () => {
    const commentBody = {
      text: newComment,
      id: feedId,
    };
    console.log("Comment Body: ", commentBody);
    await createComment({
      feed: feedId,
      text: newComment,
    });
    setNewComment("");
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        marginBottom: 3,
        mt: 4,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={`/profile/${feedData?.feed.user.profileImage}`}
            sx={{
              width: 40,
            }}
          />
        }
        title={feedData?.feed.user.username}
        subheader={feedData?.feed.createdAt}
      />

      {feedData?.feed.image && (
        <CardMedia
          component="img"
          height="300"
          image={`/images/${feedData?.feed.image}`}
          alt="Post Image"
        />
      )}
      <CardContent>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleLikeClick}>
            {/* {likes} {isLiked ? <Favorite /> : <FavoriteBorder />} */}
            {feedData?.feed.likes.length}{" "}
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        <Typography variant="body1" component="p">
          {feedData?.feed.description}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={{
            mt: 1,
          }}
        >
          View all {commentData?.comments.length} comments
        </Typography>

        {commentData?.comments.map((comment) => (
          <Typography
            key={comment.id}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {comment.text}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <form
          // onSubmit={handleCommentSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <TextField
            sx={{
              flexGrow: 1,
              mr: 1,
            }}
            label="Add a comment"
            variant="outlined"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <Button
            sx={{
              m: 1,
            }}
            variant="contained"
            color="primary"
            disabled={!newComment}
            onClick={handleNewCommentSubmit}
          >
            <Send />
          </Button>
        </form>
      </CardActions>
    </Card>
  );
}

export default Index;
