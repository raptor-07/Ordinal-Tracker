"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { newVerification } from "@/actions/verifyEmailToken";
import { Container, CircularProgress } from "@mui/material";

const ConfirmEmailPage: React.FC = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const token: string | null = searchParams.get("token");
    if (!token || token == "") return;
    const fetchData = async () => {
      await newVerification(token);
    };
    fetchData();
    setLoading(false);
  });
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      disableGutters
    >
      {loading ? <CircularProgress /> : <h1>Email Verified!</h1>}
    </Container>
  );
};

export default ConfirmEmailPage;
