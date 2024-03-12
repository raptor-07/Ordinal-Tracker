"use client";

import { Roboto } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Cormorant } from "next/font/google";
import { David_Libre } from "next/font/google";
import { Share_Tech_Mono } from "next/font/google";

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

const davidLibre = David_Libre({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: ["400"],
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
    },
  },
  typography: {
    fontFamily: spaceMono.style.fontFamily,
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
