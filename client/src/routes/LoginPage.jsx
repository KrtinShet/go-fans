import React from "react";
import Container from "@mui/material/Container";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockClockOutlined";

import { useLoginMutation } from "./../store/api/authApiSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [login, { data: loginData }] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await login({
      email: data.get("email"),
      password: data.get("password"),
    });
    navigate("/feeds");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LogIn
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
