"use client";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { useState, useEffect } from "react";
import Link from "next/link";

function CustomButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        ...(window.innerWidth <= 600 && {
          left: "53%",
          bottom: "15%",
          minWidth: 280,
          minHeight: 70,
        }),
        "&:hover": {
          boxShadow: "0px 0px 20px 0px #6a67c9",
        },
      }}
    >
      <Fade in={showButton} timeout={200}>
        <Link href="/dashboard" passHref>
          <Button
            variant="outlined"
            component="a"
            sx={{
              color: "primary.main",
              borderColor: "primary.main",
              "&:hover": {
                borderColor: "primary.light",
                boxShadow: "0px 0px 20px 0px #6a67c9",
                minWidth: 240,
                minHeight: 50,
              },
              "&:active": {
                boxShadow: "0px 0px 20px 0px #6a67c9",
                textDecoration: "none",
                textDecoration: "none",
                backgroundColor: "transparent",
              },
              "&:focus": {
                textDecoration: "none",
                backgroundColor: "transparent",

              },
              minWidth: 200,
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 6,
              paddingRight: 6,
              boxShadow: "0px 0px 10px 0px #6a67c9",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
              }}
            >
              Try For Free
            </Typography>
          </Button>
        </Link>
      </Fade>
    </div>
  );
}

export default CustomButton;
