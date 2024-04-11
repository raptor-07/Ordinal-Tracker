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
import { resetPassword } from "@/actions/passwordReset";
import { helperToast } from "@/lib/helperToast";

export default function ResetPage() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const token = searchParams.get("token");

      if (!token) {
        helperToast.error("Wrong Url!");
        setFormData({ newPassword: "", confirmPassword: "" });
        setIsLoading(false);
        return;
      }

      //check if both passwords are same
      if (formData.newPassword !== formData.confirmPassword) {
        helperToast.error("Passwords do not match");
        setFormData({ newPassword: "", confirmPassword: "" });
        setIsLoading(false);
        return;
      }

      const result = await resetPassword(formData, token);

      if (result?.error) {
        setFormData({ newPassword: "", confirmPassword: "" });
        setIsLoading(false);
        console.error(result.error);
        return;
      }

      setIsLoading(false);
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
      }, 5000);
    } catch (error: any) {
      helperToast.error("Please try again: " + error.message);
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
              Enter your new password
            </Typography>

            <TextField
              label="new password"
              variant="outlined"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <TextField
              label="confirm password"
              variant="outlined"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {resetSuccess && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Password Reset successfully
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
              Reset Password
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
}
