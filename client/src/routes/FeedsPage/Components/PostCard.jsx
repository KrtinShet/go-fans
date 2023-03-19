import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function MediaCard({ feed }) {
  const navigate = useNavigate();

  const navigateToPost = () => {
    navigate(`/feeds/${feed._id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 345,
        cursor: "pointer",
        my: 2,
      }}
      onClick={navigateToPost}
    >
      {feed.image && (
        <CardMedia
          sx={{ height: 140 }}
          image={`/images/${feed.image}`}
          title="green iguana"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {feed.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {feed.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <Typography variant="body2" color="text.secondary">
            {feed.likes.length}
          </Typography>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Typography variant="body2" color="text.secondary">
            {feed.likes.length}
          </Typography>
          <ModeCommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
