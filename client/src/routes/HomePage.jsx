import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  let decorative = "All-in-One";
  let title = "Sign up to support your favorite creators";
  let subtitle =
    "Be the first ones to get notified when your favorite creators post new content";

  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      navigate("/feeds");
    }
  }, []);

  return (
    <Container>
      <Box
        sx={{
          flex: 1,
          height: "60vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          my: 6,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            color: "primary.500",
            fontWeight: 600,
            fontSize: "sm",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {decorative}
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
            fontWeight: 800,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "lg",
            color: "gray.500",
            maxWidth: "54ch",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Link
          sx={{
            textDecoration: "none",
          }}
          to="/login"
        >
          <Button
            sx={{
              color: "primary.500",
              border: "1px solid",
              borderColor: "primary.500",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontSize: "sm",
              textDecoration: "none",
            }}
          >
            Go Login In?
          </Button>
        </Link>

        {/* <Button></Button> */}
      </Box>
    </Container>
  );
}

export default HomePage;
