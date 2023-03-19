import React, { useMemo } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetCreatorDetailsQuery,
  useGetSubscribedCreatorsQuery,
} from "./../../store/api/userApiSlice";

function Index() {
  const { creatorId } = useParams();

  const { data: creatorData } = useGetCreatorDetailsQuery(creatorId);
  const { data: subscriberdCreatorData } = useGetSubscribedCreatorsQuery();

  let isFollowing = useMemo(() => {
    if (!subscriberdCreatorData) return false;
    return subscriberdCreatorData.subscriptions.some(
      (subscription) => subscription.creator._id === creatorId
    );
  }, [subscriberdCreatorData, creatorId]);

  let handleFollowClick = () => {
    console.log("Follow Clicked");
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 500, mt: 3 }}>
        <CardHeader
          avatar={
            <Avatar src={`/profile/${creatorData?.user.profileImage}`}>
              {" "}
            </Avatar>
          }
          title={creatorData?.user.username}
          subheader={creatorData?.user.tagline || creatorData?.user.email}
        />
        <CardContent>
          <Typography variant="body1" component="p">
            {creatorData?.user.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFollowClick}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Index;
