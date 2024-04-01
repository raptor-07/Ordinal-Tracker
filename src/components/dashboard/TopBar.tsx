"use client";

import { useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/current-user";
import CloseIcon from "@mui/icons-material/Close";
import Profile from "./Profile";

function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const userRef = React.useRef(currentUser);

  const initialPages = [
    { name: "Portfolio", active: false, path: "/dashboard" },
    { name: "Watch List", active: false, path: "/dashboard/watchlist" },
    { name: "Alerts", active: false, path: "/dashboard/alerts" },
  ];

  const [pages, setPages] = useState(initialPages);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const currentPath = pathname;
    setPages(
      pages.map((page) => ({
        ...page,
        active: page.path === currentPath,
      }))
    );
  }, [pathname]);

  const handlePageClick = (pageName: string, path: string) => {
    if (
      (userRef.current === null || userRef.current === undefined) &&
      (pageName === "Watch List" || pageName === "Alerts")
    ) {
      setOpen(true);
      return;
    }
    setPages(
      pages.map((page) =>
        page.name === pageName
          ? { ...page, active: true }
          : { ...page, active: false }
      )
    );
    router.push(path);
    window.location.reload();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          display: "flex",
        }}
        sx={{}}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <Container
            maxWidth="xl"
            sx={{
              margin: "0",
              minWidth: "95%", // take up 90% of the space
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
          <div
            style={{
              minWidth: "5%",
              backgroundColor: "#000000",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Profile />
          </div>
        </div>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            width: 400,
            backgroundColor: "background.paper",
            boxShadow: 5,
            p: 5,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 18,
              top: 20,
              width: 10,
              height: 10,
              color: (theme) => theme.palette.grey[500],
              "&:hover": {
                color: (theme) => theme.palette.grey[300],
                backgroundColor: "transparent",
                boxShadow:
                  "2px 2px 4px rgba(0, 0, 0.8, 0.3), 0 0 8px rgba(0, 0, 0.8, 0.3)",
              },
              padding: 2,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            Sign in to track your favorite Ordinals!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/auth/signin")}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default TopBar;
