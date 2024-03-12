"use client";

import {
  Container,
  Box,
  Avatar,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { RegisterSchema } from "@/schemas";
import { useState } from "react";
import register from "@/actions/register";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validateFields = RegisterSchema.safeParse(formData);

      if (!validateFields.success) {
        console.error("Validation error");
        return;
      }
      register(validateFields.data);
      
      console.log("Form submitted");
    } catch (error: any) {
      console.error("Validation error:", error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          outline: "1px solid #6a67c9",
          padding: "20px",
          borderRadius: "4px",
          boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.9)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "300px",
        }}
      >
        <Avatar
          sx={{
            width: "30px",
            height: "30px",
            margin: "auto",
            backgroundColor: "#6a67c9",
          }}
        />
        <form onSubmit={onSubmit}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              label="Vitalik@Eth.xyz"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{ backgroundColor: "#6a67a9", color: "#ffffff" }}
            >
              Sign Up
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
}
