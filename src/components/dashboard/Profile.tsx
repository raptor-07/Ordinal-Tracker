"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import addTelegramId from "@/actions/addTelegramId";
import { useCurrentUser } from "@/hooks/current-user";
import logout from "@/actions/signout";
import { useRouter } from "next/navigation";

interface ProfileProps {}

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [telegramId, setTelegramId] = useState("");

  const currentUser = useCurrentUser();
  const userRef = React.useRef(currentUser);
  const init = userRef.current === undefined ? false : true;
  const [isLoggedIn, setIsLoggedIn] = useState(init);

  const handleTelegramIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTelegramId(event.target.value);
  };

  const handleTelegramIdEnter = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (userRef.current === undefined) {
        (event.target as HTMLInputElement).value = "";
        alert("Log in to use this feature!");
        setTelegramId("");
        (event.target as HTMLInputElement).value = "";
        return;
      }
      //call addTelegramId server action
      const result: any = await addTelegramId(userRef, telegramId);

      if (result.success) {
        console.log("Telegram ID added successfully");
        (event.target as HTMLInputElement).value = "Added successfully!";
        setTimeout(() => {
          setTelegramId("");
        }, 500);
      } else {
        console.log("Error adding Telegram ID", result.error);
        alert("Error adding Telegram ID");
        setTelegramId("");
        (event.target as HTMLInputElement).value = "";
      }
      console.log(telegramId);

      return;
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = async () => {
    setAnchorEl(null);
    const result = await logout();
    if (result.success == true) {
      console.log("Logout successful");

      //clear local storage
      localStorage.clear();

      //clear session storage
      sessionStorage.clear();

      //clear cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      //redirect to landing page
      setIsLoggedIn(false);
      window.location.href = "/";
    } else {
      console.log("Error logging out", result.error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}
      style={{
        backgroundColor: "#000000",
      }}
    >
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        style={{
          backgroundColor: "#000000",
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "#000000",
          }}
        >
          <PersonOutlineIcon
            style={{
              fill: "#ffffff",
            }}
          />
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 0px 15px 0px #ffffff",
          p: 5,
        }}
      >
        <Typography variant="h6" align="center">
          Profile
        </Typography>
        <MenuItem>
          <TextField
            label="Telegram chat ID"
            value={telegramId}
            onChange={handleTelegramIdChange}
            onKeyDown={handleTelegramIdEnter}
          />
        </MenuItem>
        <MenuItem>
          <StyledLink href="https://www.alphr.com/find-chat-id-telegram/">
            <p
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              Whats chat ID?
            </p>
          </StyledLink>
        </MenuItem>
        {isLoggedIn && (
          <MenuItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignout}
              sx={{
                width: "100%",
                padding: 1,
                "&:hover": {
                  backgroundColor: "#ff0000",
                  color: "#ffffff",
                },
              }}
            >
              Log out
            </Button>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Profile;
