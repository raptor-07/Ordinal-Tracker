"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Alert, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useCurrentUser } from "@/hooks/current-user";
import logout from "@/actions/signout";
import { useRouter } from "next/navigation";
import checkTeleId from "@/actions/checkTeleId";
import TelegramIcon from "@mui/icons-material/Telegram";
import getUserId from "@/actions/getUserId";

interface ProfileProps {}

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [telegramConnect, setTelegramConnect] = useState<boolean>(false);

  const currentUser = useCurrentUser();
  const userRef = React.useRef(currentUser);
  const init = userRef.current === undefined ? false : true;
  const [isLoggedIn, setIsLoggedIn] = useState(init);

  React.useEffect(() => {
    // I am checking if we already have the users tele id in which case connect telegram button should not be shown

    async function teleStatus() {
      if (userRef.current) {
        const result = await checkTeleId(userRef.current.email);
        if (result) {
          setTelegramConnect(true);
        } else {
          setTelegramConnect(false);
        }
      }
    }
    teleStatus();
  }, []);

  const handleTelegramConnect = async () => {
    if (userRef.current) {
      const userId = await getUserId(userRef.current.email);
      console.log("userId", userId);
      // Here I have attached the userId to bot link and the redirect the user
      router.push(`https://t.me/Ordify_bot?start=${userId}`);
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

      router.push("/");
      return;
    } else {
      console.log("Error logging out", result.error);
    }
  };

  return (
    <div>
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
          <PersonOutlineIcon className="fill-white" />
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
          {telegramConnect ? (
            <Alert severity="success">Telegram connected</Alert>
          ) : (
            <Button
              variant="contained"
              onClick={handleTelegramConnect}
              sx={{
                width: "100%",
                padding: 1,
                "&:hover": {
                  backgroundColor: "rgb(90 125 250)",
                  color: "#ffffff",
                },
              }}
              className="flex justify-evenly border-x-blue-600 bg-blue-400"
            >
              <p className=" p-0 m-0">Connect Telegram</p>
              <TelegramIcon />
            </Button>
          )}
        </MenuItem>
        {/* <MenuItem>
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
        </MenuItem> */}
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
    </div>
  );
};

export default Profile;
