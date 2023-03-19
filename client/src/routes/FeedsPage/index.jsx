import React from "react";
import { Container, Grid } from "@mui/material";

import FeedPosts from "./Components/FeedPosts";
import SubscribedCreators from "./Components/SubscribedCreators";

function Index() {
  return (
    <Container maxWidth={"lg"} sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <FeedPosts />
        </Grid>
        <Grid item xs={4}>
          <SubscribedCreators />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Index;
