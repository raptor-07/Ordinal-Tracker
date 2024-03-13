"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { validate, Network } from "bitcoin-address-validation";

function TopBar({
  wallets,
  setWallets,
  setLoading,
}: {
  wallets: string;
  setWallets: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialPages = [
    { name: "Collections", active: true },
    { name: "Watch List", active: false },
    { name: "Alerts", active: false },
  ];

  const [pages, setPages] = useState(initialPages);
  const [showWalletExistsAlert, setWalletExistsAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handlePageClick = (pageName: string) => {
    setPages(
      pages.map((page) =>
        page.name === pageName
          ? { ...page, active: true }
          : { ...page, active: false }
      )
    );
  };

  const [newWallet, setNewWallet] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAddWallet = () => {
    if (wallets.split(",").includes(newWallet)) {
      setWalletExistsAlert(true);
      setTimeout(() => {
        setWalletExistsAlert(false);
      }, 1500);
      return;
    }

    if (validate(newWallet, Network.mainnet)) {
      let copyWallets = wallets;
      const updatedWallets = copyWallets
        ? copyWallets + "," + newWallet
        : newWallet;
      localStorage.setItem("wallets", updatedWallets);
      setWallets(updatedWallets);
      setLoading(true);
      setNewWallet("");
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  };

  return (
    <AppBar
      enableColorOnDark
      position="sticky"
      color="primary"
      style={{
        backgroundColor: "#000000",
        color: "white",
        boxShadow: "none",
        margin: 0,
        padding: 0,
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
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OrdiTrack
          </Typography>

          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: "space-evenly",
            }}
            style={{
              backgroundColor: "#000000",
            }}
          >
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "flex" },
                mt: "45px",
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

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
              letterSpacing: ".3rem",
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
              minWidth: "80%",
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
                onClick={() => handlePageClick(page.name)}
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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open wallets">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src="/images/wallet.png"
                  sx={{
                    width: 70,
                    height: 70,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "60px", mr: "10px", minWidth: "200px", p: 0 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <TextField
                  label="New Wallet"
                  value={newWallet}
                  onChange={(e) => setNewWallet(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                />

                <Button
                  onClick={handleAddWallet}
                  sx={{
                    m: 2,
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    minWidth: "100%",
                    "&:hover": {
                      boxShadow: "0px 0px 10px 0px rgba(106, 103, 201, 0.5)",
                      textDecorationColor: "white",
                    },
                  }}
                >
                  <p
                    style={{
                      color: "#6a67c9",
                      fontWeight: 700,
                      padding: "0",
                      margin: "0",
                    }}
                  >
                    ADD WALLET
                  </p>
                </Button>
                {showWalletExistsAlert && (
                  <Alert
                    severity="error"
                    sx={{
                      maxWidth: "220px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        padding: "0",
                        fontSize: "0.8rem",
                      }}
                    >
                      Wallet {newWallet} already exists!
                    </p>
                  </Alert>
                )}
                {showAlert && (
                  <Alert
                    severity="error"
                    sx={{
                      maxWidth: "220px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        padding: "0",
                        fontSize: "0.8rem",
                      }}
                    >
                      {newWallet} is not a valid BTC Address!
                    </p>
                  </Alert>
                )}
              </Box>
              {wallets.split(",").map((wallet_id) => {
                const shortenedId = `${wallet_id.slice(
                  0,
                  4
                )}....${wallet_id.slice(-4)}`;
                return (
                  <MenuItem
                    key={wallet_id}
                    onClick={handleCloseUserMenu}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        width: "100%",
                        height: "100%",
                        padding: "5px",
                        textDecorationColor: "#6a67c9",
                        textShadow: "0 0 10px #6a67c9",
                      }}
                    >
                      {shortenedId}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;
