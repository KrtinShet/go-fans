import React from "react";
import Container from "@mui/material/Container";
import { Box, Card, Paper, Typography } from "@mui/material";

import Top3Users from "./Top3Users";
import Top5Creators from "./Top5Creators";
import AvgUserPayment from "./AvgUserPayment";

function Index() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography component={"h2"} variant="h2">
        Stats
      </Typography>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" component="h5" mb={2}>
          Top 3 Users
        </Typography>
        <Top3Users />
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" component="h5" mb={2}>
          Top 5 Creators
        </Typography>
        <Top5Creators />
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" component="h5" mb={2}>
          Average Payment by Users
        </Typography>
        <AvgUserPayment />
      </Paper>
    </Container>
  );
}

export default Index;
