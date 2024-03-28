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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Star, StarBorder } from "@mui/icons-material";
import { getWatchlists } from "@/actions/handleWatchlist";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  addWatchListById,
  deleteWatchlistById,
} from "@/actions/handleWatchlist";
import {
  sortingTable,
  formatPercentage,
  satoshisToBTC,
} from "../dashboard/Table";
import { getAlertEntries } from "@/actions/getAlertEntries";
import { createAlertEntry } from "@/actions/createAlertEntry";
import { deleteAlertEntry } from "@/actions/deleteAlertEntry";

export interface Watchlist {
  name: string;
  image: string;
  collection_id: string;
  description: string;
  owner_count: number;
  nft_count: number;
  quantity: number;
  volume_1d: number;
  volume_7d: number;
  volume_30d: number;
  market_cap: number;
  floor_price: number;
  One_D_floor: number;
  Seven_D_floor: number;
}

export default function CollectionTable({
  watchlist,
  setWatchlist,
  sort,
  setSort,
  isLoading,
  setIsLoading,
}: {
  watchlist: Watchlist[];
  setWatchlist: React.Dispatch<React.SetStateAction<any>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user: any = useCurrentUser();
  const router = useRouter();
  let userRef: any = React.useRef(user);
  console.log("userRef in Table", userRef, user);

  const [fetchData, setFetchData] = React.useState<boolean>(true);
  const watchlistCollectionIds = React.useRef([]);
  const [reloadTable, setReloadTable] = React.useState<boolean>(false);
  const [alerts, setAlerts] = React.useState<any>([]);

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
    //get watchlist collection ids
    const watchlistCollections: any = [];
    watchlist.forEach((collection) => {
      watchlistCollections.push(collection.collection_id);
    });
    watchlistCollectionIds.current = watchlistCollections;

    console.log("watchlistCollectionIds", watchlistCollectionIds);
    setReloadTable(!reloadTable);
  }, [watchlist, fetchData]);

  React.useEffect(() => {
    //get alerts data
    const fetchAlerts = async () => {
      try {
        const alertsData = await getAlertEntries(userRef);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  React.useEffect(() => {
    //get watchlist data
    const fetchData = async () => {
      const watchlistTableData = localStorage.getItem("watchlistTableData");
      if (watchlistTableData) {
        // Data exists locally - use it
        console.log(
          "Data exists in local storage - using local storage to render data"
        );
        setWatchlist(JSON.parse(watchlistTableData));
        setIsLoading(false);
        return;
      }

      //fetch from api
      const data = await getWatchlists(userRef);
      //store data in local storage
      localStorage.setItem(
        "watchlistTableData",
        JSON.stringify(data.watchlists)
      );

      console.log("watchlist data", data);
      if (data.error) {
        if (data.error === "Please login to view your watchlist") {
          alert(data.error);
          router.push("/auth/signin");
        }
        alert(data.error);
        return;
      }
      if (data.watchlists) {
        const sortedData = sortingTable(sort, data.watchlists);
        console.log("sortedData", sortedData);
        setWatchlist(sortedData);
        localStorage.setItem("watchlistTableData", JSON.stringify(sortedData));
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchData]);

  const handleRefetch = async () => {
    localStorage.removeItem("watchlistTableData");
    setIsLoading(true);
    setFetchData(!fetchData);
  };

  const handleSort = (sort: string) => {
    const sortedData = sortingTable(sort, watchlist);
    setWatchlist(sortedData);
    setSort(sort);
  };

  const markAsWatchlist = async (collectionId: string) => {
    try {
      const result: any = await deleteWatchlistById(collectionId, userRef);

      if (result?.error) {
        console.error(result.error);
        alert("Error in deleting collection from watchlist");
        return;
      }

      // If the database action is successful, update the Ref, localstorage
      watchlistCollectionIds.current.filter((id: any) => id !== collectionId);

      const currentWatchlistTableData: any =
        localStorage.getItem("watchlistTableData");
      const updatedWatchlistData = JSON.parse(currentWatchlistTableData).filter(
        (collection: any) => collection.collection_id !== collectionId
      );
      localStorage.setItem(
        "watchlistTableData",
        JSON.stringify(updatedWatchlistData)
      );
      console.log("updatedWatchlistData", updatedWatchlistData);

      const currentWatchlistCollectionIds: any =
        localStorage.getItem("watchlistData");
      const updatedWatchlistCollectionIds = JSON.parse(
        currentWatchlistCollectionIds
      ).filter((id: any) => id !== collectionId);
      localStorage.setItem(
        "watchlistData",
        JSON.stringify(updatedWatchlistCollectionIds)
      );
      console.log(
        "updatedWatchlistCollectionIds",
        updatedWatchlistCollectionIds
      );

      setWatchlist(updatedWatchlistData);
      setReloadTable(!reloadTable);

      return;
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const setAlertsHandler = async (collectionId: string) => {
    //create alert or delete alert
    const isInAlerts = alerts.some(
      (alert: any) => alert.collectionId === collectionId
    );
    if (isInAlerts) {
      //delete alert
      const alertToDelete = alerts.find(
        (alert: any) => alert.collectionId === collectionId
      );
      try {
        const result: any = await deleteAlertEntry(userRef, alertToDelete.aId);

        if (result?.error) {
          console.error(result.error);
          alert("Error in deleting alert");
          return;
        }

        // If the database action is successful, update the Ref, localstorage
        const updatedAlerts = alerts.filter(
          (alert: any) => alert.collectionId !== collectionId
        );
        setAlerts(updatedAlerts);
        return;
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    } else {
      //create alert
      try {
        const result: any = await createAlertEntry(userRef, { collectionId });

        if (result?.error) {
          console.error(result.error);
          alert("Error in adding alert");
          return;
        }

        // If the database action is successful, update the Ref, localstorage
        const updatedAlerts = [...alerts, result];
        setAlerts(updatedAlerts);
        return;
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
  };

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
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
          {watchlist.map(
            (row, index) =>
              watchlistCollectionIds.current.includes(
                row.collection_id as never
              ) && (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {row.image === "" ? (
                        <></>
                      ) : (
                        <Avatar alt={row.name} src={row.image} />
                      )}

                      {row.name}
                      <motion.div
                        whileHover="hover"
                        whileTap="tap"
                        variants={starVariants}
                        onClick={() => markAsWatchlist(row.collection_id)}
                      >
                        {row.image !== "" &&
                          (watchlistCollectionIds.current.includes(
                            row.collection_id as never
                          ) ? (
                            <Star />
                          ) : (
                            <></>
                          ))}
                      </motion.div>
                      <motion.div
                        whileHover="hover"
                        whileTap="tap"
                        variants={starVariants}
                        onClick={() => setAlertsHandler(row.collection_id)}
                      >
                        {row.image !== "" &&
                        alerts.some(
                          (alert: any) =>
                            alert.collectionId === row.collection_id
                        ) ? (
                          <NotificationsActiveIcon />
                        ) : (
                          <NotificationsNoneIcon />
                        )}
                      </motion.div>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {row.floor_price !== 0 && (
                      <p style={{ margin: 0, padding: 0 }}>{row.floor_price}</p>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {formatPercentage({
                      percentageString: String(String(row.One_D_floor)),
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {formatPercentage({
                      percentageString: String(row.Seven_D_floor),
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {row.volume_1d !== 0 && (
                      <p style={{ margin: 0, padding: 0 }}>
                        {satoshisToBTC(row.volume_1d)}
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.volume_7d !== 0 && (
                      <p style={{ margin: 0, padding: 0 }}>
                        {satoshisToBTC(row.volume_7d)}
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.volume_30d !== 0 && (
                      <p style={{ margin: 0, padding: 0 }}>
                        {satoshisToBTC(row.volume_30d)}
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.market_cap !== 0 && (
                      <p style={{ margin: 0, padding: 0 }}>
                        {satoshisToBTC(row.market_cap)}
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.owner_count !== 0 && row.nft_count !== 0 && (
                      <p style={{ margin: 0, padding: 0 }}>
                        {((row.owner_count / row.nft_count) * 100).toPrecision(
                          3
                        )}
                        %
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
