import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/notes"); // redirect to notes page
  };

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Notes App 📒
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
        Manage your notes efficiently with Add, View, Edit, and Delete features.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleGetStarted}>
          Get Started
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
