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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { LoginSchema } from "@/schemas";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import login from "@/actions/login";
import { useCurrentUser } from "@/hooks/current-user";
import { signOut } from "@/auth";
import { helperToast } from "@/lib/helperToast";

export default function SigninPage() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl");

  const user = useCurrentUser();
  const userRef = useRef(user);
  // console.log("user", userRef);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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
      if (userRef.current !== undefined) {
        //session exists
        // signOut();
        //clear local storage
        localStorage.clear();
        console.log("Local Storage Cleared", localStorage);
      }

      localStorage.clear();
      console.log("Local Storage Cleared", localStorage);

      const validateFields = LoginSchema.safeParse(formData);

      // console.log("validateFields", validateFields);

      if (!validateFields.success) {
        console.error("Validation error");
        setIsLoading(false);
        return;
      }

      const result = await login(validateFields.data, callBackUrl);

      if (result?.error == "Email not verified") {
        setEmailSuccess(true);
        setTimeout(() => {
          setEmailSuccess(false);
        }, 4000);
      }

      setIsLoading(false);
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
            <Link
              href="/auth/forgot-password"
              color="inherit"
              sx={{
                marginTop: "-16px",
                padding: "0",
                fontSize: "0.7rem",
                textAlign: "right",
              }}
            >
              {"Forgot Password?"}
            </Link>
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
              Sign In
            </Button>
          </FormControl>
        </form>
        <Link
          href="/auth/signup"
          color="inherit"
          sx={{
            fontSize: "0.8rem",
            textAlign: "center",
          }}
        >
          {"Signup - Create New Account"}
        </Link>
      </Box>
    </Container>
  );
}
