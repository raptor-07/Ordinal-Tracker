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
import { signIn } from "@/auth";

function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const userRef = React.useRef(currentUser);

  const initialPages = [
    { name: "Portfolio", active: false, path: "/dashboard" },
    { name: "WatchList", active: false, path: "/dashboard/watchlist" },
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
    // router.push(path);
    window.location.href = path;
    return;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between  py-2 items-center">
        <p onClick={() => router.push("/")} className="text-2xl text-green-600">
          OrdiTrack
        </p>

        <div className="flex gap-10">
          {pages.map((page) => (
            <div
              key={page.name}
              onClick={() => handlePageClick(page.name, page.path)}
              className="cursor-pointer"
            >
              <Button
                className={`hover:text-green-700 ${
                  page.active ? "text-green-700" : ""
                }`}
              >
                {page.name}
              </Button>
            </div>
          ))}
        </div>
        {userRef.current === null || userRef.current === undefined ? (
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
        ) : (
          <Profile />
        )}
      </div>

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
