import React from "react";
import { Container, Box } from "@mui/material";

function NotFoundPage() {
  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <h3>404 - Not Found!</h3>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
