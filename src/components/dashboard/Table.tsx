"use client";

import * as React from "react";
import { useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCurrentUser } from "@/hooks/current-user";
import getDashboardData from "@/actions/getDashboardData";
import { Box, CircularProgress, Button, Avatar } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Star, StarBorder } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { addNewWallet } from "@/actions/addNewWallet";
import { motion } from "framer-motion";
import { isWatchlistCollection } from "@/data/collection";
import {
  addWatchListById,
  deleteWatchlistById,
} from "@/actions/handleWatchlist";
import { set } from "zod";
// import { getUserByEmail } from "@/data/user";

export default function CollectionTable({
  wallets,
  reload,
  setReload,
  fetchData,
  setFetchData,
  isLoading,
  setIsLoading,
}: {
  wallets: any[];
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: boolean;
  setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user: any = useCurrentUser();
  // console.log("user", user);
  let userRef: any = useRef(user);
  // console.log("userRef", userRef);

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

  //TODO: create a state for sorting
  //TODO: create a function to sort by sorting state

  const router = useRouter();

  const [dashBoardData, setDashBoardData] = React.useState<any>([
    {
      collection_id: "",
      name: "",
      image_url: "",
      floor_price: "",
      One_D_floor: "",
      Seven_D_floor: "",
      volume_1d: "",
      volume_7d: "",
      volume_30d: "",
      market_cap: "",
      total_quantity: "",
      distinct_owner_count: "",
      distinct_nft_count: "",
    },
  ]);
  //set initial from local storage

  const [watchlist, setWatchlist] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (wallets.length == 0 && userRef.current == undefined) {
      //Session 0 | Wallets 0
      setDashBoardData([
        {
          collection_id: "",
          floor_price: "",
          One_D_floor: "",
          Seven_D_floor: "",
          volume_1d: "",
          volume_7d: "",
          volume_30d: "",
          market_cap: "",
        },
      ]);
      setIsLoading(false);
      return;
    }
  }, [wallets]);

  React.useEffect(() => {
    if (wallets.length == 0 && userRef.current == undefined) {
      //Session 0 | Wallets 0
      //TODO: Add another field - owners count
      setDashBoardData([
        {
          collection_id: "",
          name: "",
          image_url: "",
          floor_price: "",
          One_D_floor: "",
          Seven_D_floor: "",
          volume_1d: "",
          volume_7d: "",
          volume_30d: "",
          market_cap: "",
          total_quantity: "",
          distinct_owner_count: "",
          distinct_nft_count: "",
        },
      ]);
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      //TODO: check if data exists in local storage -> if not then fetch
      if (
        localStorage.getItem("dashboardData") !== null &&
        localStorage.getItem("dashboardData") !== undefined &&
        localStorage.getItem("dashboardData") !== ""
      ) {
        //data exists
        console.log(
          "data exists in local storage - using local storage to render data"
        );
        const dashboardData: any = localStorage.getItem("dashboardData");
        setDashBoardData(JSON.parse(dashboardData));

        setIsLoading(false);

        return;
      }

      //data from api
      console.log("Fetching data from API!");
      if (userRef.current !== undefined && wallets.length > 0) {
        //Session 1 | Wallet 1 -> check consistency between local storage and db
        console.log("Wallets in fetchData", wallets);
        await addNewWallet(userRef.current, wallets);
      }

      //local storage wallets
      const walletString = wallets.map((wallet) => wallet.label).join(",");

      //fetch data
      let dataPromise: any = getDashboardData(userRef, walletString);

      //timeout logic
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Timeout occurred"));
          // alert("Service down, please try again later! from 1");
          setIsLoading(false);
        }, 120000); // 2 minutes timeout
      });

      // Race between dataPromise and timeoutPromise #FIXME
      //TODO: What type is being returned by timeoutPromise - error handling
      const data = await Promise.race([dataPromise, timeoutPromise]);

      if (data !== null && data !== undefined) {
        console.log("data", data);
        if (data.error) {
          if (data.error === "No collections found") {
            //Session 1 | Wallets 0
            //user has no collections in db
            console.error("No collections found in DB");
            setDashBoardData([
              {
                collection_id: "",
                name: "",
                image_url: "",
                floor_price: "",
                One_D_floor: "",
                Seven_D_floor: "",
                volume_1d: "",
                volume_7d: "",
                volume_30d: "",
                market_cap: "",
                total_quantity: "",
                distinct_owner_count: "",
                distinct_nft_count: "",
              },
            ]);
            setIsLoading(false);
            return;
          }
          if (data.error === "No data found") {
            alert("Service down, please try again later! from 2");
            setDashBoardData([
              {
                collection_id: "",
                name: "",
                image_url: "",
                floor_price: "",
                One_D_floor: "",
                Seven_D_floor: "",
                volume_1d: "",
                volume_7d: "",
                volume_30d: "",
                market_cap: "",
                total_quantity: "",
                distinct_owner_count: "",
                distinct_nft_count: "",
              },
            ]);
            setIsLoading(false);
            return;
          }
          console.error("Error in getting data", data.error);
          alert("Error in getting data. You may need to login again!");
          setIsLoading(false);
          router.push("/auth/signin");
          return;
        }

        if (data.wallets) {
          //Session 1 | Wallets 0
          //user has wallets -> update wallets in local storage
          console.log("data.wallets", data.wallets);
          console.log("wallets", wallets);
          localStorage.setItem("wallets", data.wallets);
          // console.log("data for dashboard on client", data);
          setDashBoardData(data.data);
          //TODO: set dashboard data in local storage
          // localStorage.setItem("dashboardData", JSON.stringify(data.data));
          // setIsLocalData(true);
          setReload(!reload);
          setIsLoading(false);
          return;
        }
        setDashBoardData(data);
        setIsLoading(false);
        //TODO: set wallets in local storage
        localStorage.setItem("dashboardData", JSON.stringify(data));
      } else {
        alert("Service down, please try again later! from 3");
        return;
      }

      // const watchlistData = await checkDb
      //error handling
      //setwatchlist
      //save in local storage
    };
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    const watchlistIdsString: any = localStorage.getItem("watchlistData");

    const watchlistIds: any =
      watchlistIdsString !== "" &&
      watchlistIdsString !== null &&
      watchlistIdsString !== undefined
        ? JSON.parse(watchlistIdsString)
        : [];

    setWatchlist(watchlistIds);
  }, []);

  const handleRefetch = () => {
    localStorage.removeItem("dashboardData");
    setIsLoading(true);
    setFetchData(!fetchData);
  };

  const markAsWatchlist = async (collectionId: string) => {
    try {
      if (userRef.current === undefined) {
        //session does not exist
      }
      //If session does exist
      // Determine whether the collectionId is already in the watchlist
      //true -> remove from watchlist
      //false -> add to watchlist
      const isAlreadyInWatchlist = watchlist.includes(collectionId);

      // server action
      if (isAlreadyInWatchlist) {
        //delete watchlist server action
        const result: any = await deleteWatchlistById(collectionId, userRef);

        if (result?.error) {
          console.error(result.error);
          alert("Error in deleting collection from watchlist");
          return;
        }

        // If the database action is successful, update the state
        setWatchlist((prevState) => {
          return prevState.filter((id) => id !== collectionId);
        });

        setReload(!reload);
      } else {
        const result: any = await addWatchListById(collectionId, userRef);
        console.log("result", result);
        if (result.error) {
          console.error(result.error);
          alert("Error in adding collection to watchlist");
          return;
        }
        // If the database action is successful, update the state
        if (result) {
          setWatchlist((prevState) => {
            return [...prevState, collectionId];
          });
        }
        if (result.error) {
          console.error(result.error);
        }
      }
      localStorage.setItem("watchlistData", JSON.stringify(watchlist));

      return;
    } catch (error) {
      // Handle the error
      console.error(error);
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
        sx={{ minWidth: 650, backgroundColor: "#000000" }}
        aria-label="simple table"
      >
        <TableHead
          sx={{
            boxShadow: "0px 0px 5px 0px #c5c2f1",
            padding: "0",
          }}
        >
          <TableRow
            sx={{
              minWidth: "100%",
            }}
          >
            <TableCell
              sx={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                width: "min-content",
                // maxWidth: "50px",
              }}
            >
              <Button
                onClick={handleRefetch}
                sx={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "0",
                  margin: "0",
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
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                }}
              >
                Floor
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
                }}
              >
                1D Floor Change
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
                }}
              >
                7D Floor Change
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
                }}
              >
                Volume 1D
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
                }}
              >
                Volume 7D
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
                }}
              >
                Volume 30D
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
                }}
              >
                MCap
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
                }}
              >
                Owners (%)
              </p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashBoardData?.map((row: any) => (
            <TableRow
              key={row.collection_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Avatar alt={row.name} src={row.image_url} />
                {row.name}
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={starVariants}
                  onClick={() => markAsWatchlist(row.collection_id)}
                >
                  {watchlist.includes(row.collection_id) ? (
                    <Star />
                  ) : (
                    <StarBorder />
                  )}
                </motion.div>
              </TableCell>
              <TableCell align="right">
                {formatPercentage({ percentageString: row.floor_price })}
              </TableCell>
              <TableCell align="right">
                {formatPercentage({ percentageString: row.One_D_floor })}
              </TableCell>
              <TableCell align="right">
                {formatPercentage({ percentageString: row.Seven_D_floor })}
              </TableCell>
              <TableCell align="right">
                <p style={{ margin: 0, padding: 0 }}>
                  {satoshisToBTC(row.volume_1d)}
                </p>
              </TableCell>
              <TableCell align="right">
                <p style={{ margin: 0, padding: 0 }}>
                  {satoshisToBTC(row.volume_7d)}
                </p>
              </TableCell>
              <TableCell align="right">
                <p style={{ margin: 0, padding: 0 }}>
                  {satoshisToBTC(row.volume_30d)}
                </p>
              </TableCell>
              <TableCell align="right">
                <p style={{ margin: 0, padding: 0 }}>
                  {satoshisToBTC(row.market_cap)}
                </p>
              </TableCell>
              <TableCell align="right">
                <p style={{ margin: 0, padding: 0 }}>
                  {(
                    (row.distinct_owner_count / row.distinct_nft_count) *
                    100
                  ).toPrecision(3)}{" "}
                  %
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
