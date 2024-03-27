"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  CircularProgress,
  Button,
  Avatar,
  Modal,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Star, StarBorder } from "@mui/icons-material";
import { getWatchlists } from "@/actions/handleWatchlist";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export interface Watchlist {
  name: string;
  image: string;
  collection_id: string;
  description: string;
}

export default function CollectionTable({
  watchlist,
  setWatchlist,
}: {
  watchlist: Watchlist[];
  setWatchlist: React.Dispatch<React.SetStateAction<any>>;
}) {
  const router = useRouter();

  const user: any = useCurrentUser();
  let userRef: any = React.useRef(user);

  const [sort, setSort] = React.useState<string>("");

  const buttonVariants = {
    hover: {
      scale: 1.1,
      // rotate: 360,
      transition: {
        type: "spring",
        stiffness: 20,
        damping: 20,
        duration: 1,
      },
    },
    tap: { scale: 1.2 },
  };

  const starVariants = {
    hover: {
      scale: [1, 1.2, 1, 1.2, 1], // scales up and down
      transition: {
        duration: 2,
        repeat: Infinity, // repeats the animation indefinitely
      },
    },
    tap: { scale: 0.95 },
  };

  React.useEffect(() => {
    //get watchlist data from db - initial fetch
    const fetchData = async () => {
      const data = await getWatchlists(userRef);
      if (data.error) {
        if (data.error === "Please login to view your watchlist") {
          alert(data.error);
          router.push("/auth/signin");
        }
        alert(data.error);
        return;
      }
      if (data.watchlists) {
        setWatchlist(data.watchlists);
      }
    };
    fetchData();
  }, []);

  const handleRefetch = async () => {
    // const data = await getWatchlists(userRef);
    // if (data.error) {
    //   if (data.error === "Please login to view your watchlist") {
    //     alert(data.error);
    //     router.push("/auth/signin");
    //   }
    //   alert(data.error);
    //   return;
    // }
    // if (data.watchlists) {
    //   setWatchlist(data.watchlists);
    // }
  };

  const handleSort = (sort: string) => {
    // setSort(sort);
    // if (sort === "floor") {
    //   const sorted = watchlist.sort((a, b) => {
    //     return a.description.localeCompare(b.description);
    //   });
    //   setWatchlist([...sorted]);
    // }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        margin: "auto",
        padding: "0",
      }}
    >
      <Table
        sx={{ backgroundColor: "#000000", minWidth: "100%" }}
        aria-label="simple table"
      >
        <TableHead
          sx={{
            padding: "0",
          }}
        >
          <TableRow
            sx={{
              minWidth: "100%",
              margin: "0",
              padding: "0",
            }}
          >
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  onClick={handleRefetch}
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "0",
                    margin: "0",
                    paddingTop: "4px",
                    "&:hover": {
                      backgroundColor: "#000000",
                      color: "#ffffff",
                    },
                  }}
                >
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <RefreshIcon
                      sx={{
                        marginLeft: "-24px",
                        marginTop: "10px",
                      }}
                    />
                  </motion.div>
                </Button>
                <p
                  style={{
                    fontWeight: 700,
                    marginLeft: "8px",
                    textDecorationLine: "underline",
                    textUnderlineOffset: "4px",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Name
                </p>
              </Box>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Floor
                {sort === "floor" ? (
                  <ArrowDropUpIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSort("floor")}
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                1D Floor Change
                {sort === "1D_floor" ? (
                  <ArrowDropUpIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSort("1D_floor")}
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                7D Floor Change
                {sort === "7D_floor" ? (
                  <ArrowDropUpIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSort("7D_floor")}
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Volume 1D
                {sort === "1D_volume" ? (
                  <ArrowDropUpIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSort("1D_volume")}
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Volume 7D
                {sort === "7D_volume" ? (
                  <ArrowDropUpIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSort("7D_volume")}
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Volume 30D
                {sort === "30D_volume" ? (
                  <ArrowDropUpIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSort("30D_volume")}
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                MCap
                {sort === "market_cap" ? (
                  <ArrowDropUpIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSort("market_cap")}
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Owners (%)
                {sort === "owners" ? (
                  <ArrowDropUpIcon
                    onClick={() => handleSort("owners")}
                    sx={{
                      margin: "0",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    sx={{
                      margin: "0",
                    }}
                  />
                )}
              </p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchlist.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderBottom: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar alt={item.name} src={item.image} />
                  <Typography
                    variant="h5"
                    sx={{
                      marginLeft: "10px",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {item.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
