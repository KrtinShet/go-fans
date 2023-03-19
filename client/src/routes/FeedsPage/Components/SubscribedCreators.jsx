import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGetSubscribedCreatorsQuery } from "./../../../store/api/userApiSlice";

function SubscribedCreators() {
  const navigate = useNavigate();
  const { data } = useGetSubscribedCreatorsQuery();
  let subscriptions = data?.subscriptions;
  console.log(subscriptions);

  let handleClick = (id) => {
    navigate(`/creator/${id}`);
  };

  let getCreatorsList = () => {
    if (!subscriptions) return;
    return subscriptions.map((subscription) => {
      let { creator, _id } = subscription;
      return (
        <ListItem disablePadding key={_id}>
          <ListItemButton onClick={() => handleClick(creator._id)}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar ${creator.username}`}
                src={`/profile/${creator.profileImage}`}
              />
            </ListItemAvatar>
            <ListItemText primary={`${creator.username}`} />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Paper sx={{ width: "100%", py: 1 }} elevation={3}>
      <Typography component={"h4"} variant="h5" textAlign={"center"} mt={2}>
        Subscribed Users
      </Typography>
      <List>{getCreatorsList()}</List>
    </Paper>
  );
}

export default SubscribedCreators;
