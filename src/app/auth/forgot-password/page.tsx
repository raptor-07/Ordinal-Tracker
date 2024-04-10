"use client";

import {
  Container,
  Box,
  Avatar,
  TextField,
  Button,
  FormControl,
  Link,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Label } from "@mui/icons-material";
import { sendResetPassword } from "@/actions/passwordReset";
import { set } from "zod";

export default function ResetPage() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const result = await sendResetPassword(formData);

      if (result?.error == "User not found") {
        setFormData({ email: "" });
        setIsLoading(false);
        console.error("User not found");
        return;
      }

      setIsLoading(false);
      setEmailSuccess(true);
      setTimeout(() => {
        setEmailSuccess(false);
      }, 5000);
    } catch (error: any) {
      alert("Please try again: " + error.message);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Container>
  ) : (
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
            <Typography variant="body1" color="#ffffff">
              Enter your registered email address
            </Typography>

            <TextField
              label="Vitalik@Eth.xyz"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {emailSuccess && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Reset password link sent successfully!
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
              Send Email
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
}
