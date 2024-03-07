"use client";

import { Roboto } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Cormorant } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6a67c9",
    },
    secondary: {
      main: "#f50057",
      light: "#BEBCFB",
    },
    background: {
      default: "#000000",
      paper: "#040404",
    },
  },
  typography: {
    fontFamily: cormorant.style.fontFamily,
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
