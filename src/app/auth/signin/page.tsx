"use client";

import {
  Container,
  Box,
  Avatar,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { LoginSchema } from "@/schemas";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import login from "@/actions/login";

export default function SigninPage() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl");
  console.log("callbackUrl", callBackUrl);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const validateFields = LoginSchema.safeParse(formData);

      if (!validateFields.success) {
        console.error("Validation error");
        return;
      }

      await login(validateFields.data, callBackUrl)
      console.log("Success");
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
            <Button
              type="submit"
              variant="text"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  textShadow: "0 0 5px #6a67c9",
                  color: "#C5C2F1",
                  fontWeight: "700",
                },
              }}
            >
              Sign In
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
}
