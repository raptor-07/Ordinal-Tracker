"use client";

import { useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";

function TopBar() {
  const router = useRouter();

  const initialPages = [
    { name: "Collections", active: true, path: "/dashboard" },
    { name: "Watch List", active: false, path: "/dashboard/watchlist" },
    { name: "Alerts", active: false, path: "/dashboard/alerts" },
  ];

  const [pages, setPages] = useState(initialPages);

  const handlePageClick = (pageName: string, path: string) => {
    setPages(
      pages.map((page) =>
        page.name === pageName
          ? { ...page, active: true }
          : { ...page, active: false }
      )
    );
    router.push(path);
  };

  return (
    <AppBar
      enableColorOnDark
      position="sticky"
      color="primary"
      style={{
        backgroundColor: "#000000",
        color: "white",
        margin: 0,
        padding: 0,
        boxShadow: "0px 0px 2px 0px #c5c2f1",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          margin: "0",
          minWidth: "100%",
          padding: "0",
        }}
        style={{
          backgroundColor: "#000000",
        }}
      >
        <Toolbar
          style={{
            backgroundColor: "#000000",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              minWidth: "min-content",
            }}
          >
            OrdiTrack
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
            }}
            style={{
              backgroundColor: "#000000",
            }}
          >
            OrdiTrack
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              m: "0 30px 0 0",
              maxHeight: "80%",
            }}
            style={{
              backgroundColor: "#000000",
            }}
          >
            {pages.map((page) => (
              <Paper
                elevation={0}
                key={page.name}
                onClick={() => handlePageClick(page.name, page.path)}
                sx={{
                  my: 2,
                  padding: "1.4%",
                  flexGrow: 1,
                  m: 0,
                  color: "white",
                  display: "block",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  boxShadow: "none",
                  position: "relative",
                  borderBottom: page.active ? "2px solid #6a67c9" : "none",
                  "&:hover": {
                    borderBottom: "1px solid #6a67c9",
                    "& p": {
                      textShadow: "0 0 5px #6a67c9",
                      color: "#C5C2F1",
                      fontWeight: "700",
                    },
                  },
                  "&:active": {
                    borderBottom: "2px solid #6a67c9",
                  },
                }}
                style={{
                  backgroundColor: "#000000",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    margin: 0,
                    transition: "text-shadow 0.3s ease, color 0.3s ease",
                  }}
                >
                  {page.name}
                </p>
              </Paper>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;
