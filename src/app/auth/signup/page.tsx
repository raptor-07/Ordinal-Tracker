"use client";

import {
  Container,
  Box,
  Avatar,
  TextField,
  Button,
  FormControl,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { RegisterSchema } from "@/schemas";
import { useState } from "react";
import register from "@/actions/register";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "zod";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      localStorage.clear();
      console.log("Local Storage Cleared", localStorage);

      const validateFields = RegisterSchema.safeParse(formData);

      if (!validateFields.success) {
        console.error("Validation error");
        return;
      }
      const result = await register(validateFields.data);

      console.log("result", result);

      if (result?.error) {
        //user already exists
        console.error("User already exists");
        setFormData({ email: "", password: "", name: "" });
        return;
      }

      console.log("Form submitted");

      setEmailSuccess(true);

      setTimeout(() => {
        setEmailSuccess(false);
      }, 4000);
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
          width: "50vh",
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
            {emailSuccess && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Confirmation email sent successfully!
              </Alert>
            )}
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
              Sign Up
            </Button>
          </FormControl>
        </form>
        <Link
          href="/auth/signin"
          style={{
            color: "#ffffff",
            textDecoration: "underline",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Already have an account?
        </Link>
      </Box>
    </Container>
  );
}
