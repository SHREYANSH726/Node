import React, { useState } from "react";
import { Container, TextField, Button, Paper, Stack, Typography } from "@mui/material";
import UserAPI from "../data/api";

import axios from "axios";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/user/signIn", form);
      alert("Login successful!");
      setForm({ email: "", password: "" });
    } catch (err) {
      console.error("Error logging in:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
