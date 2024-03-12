"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CustomButton from "../components/landing-page/CustomButton";
import TypeWriter from "../components/landing-page/TypeWriter";

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100vh",
          padding: "10%",
          flexDirection: "column",
        }}
      >
        <TypeWriter text="Ordinal Alerts in Real Time!" delay={100} />
        {showButton && <CustomButton />}
      </Box>
    </div>
  );
}
