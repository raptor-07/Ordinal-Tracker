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
import RefreshIcon from '@mui/icons-material/Refresh';
import { useRouter } from "next/navigation";
import { addNewWallet } from "@/actions/addNewWallet";
import { set } from "zod";

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

  //TODO: create a state for sorting
  //TODO: create a function to sort by sorting state

  const router = useRouter();

  const [dashBoardData, setDashBoardData] = React.useState<any>([
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
        }, 120000); // 2 minutes timeout
      });

      // Race between dataPromise and timeoutPromise
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
          if (data.error === "No data found") {
            alert("Service down, please try again later!");
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
        alert("Service down, please try again later!");
        return;
      }
    };
    fetchData();
  }, [fetchData]);

  const handleRefetch = () => {
    localStorage.removeItem("dashboardData");
    setIsLoading(true);
    setFetchData(!fetchData);
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
          <TableRow sx={{
            minWidth: "100%",
          }}>
            <TableCell
              sx={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                width: "min-content",
                // maxWidth: "50px",
              }}
            >
              <Button onClick={handleRefetch} sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "0",
                margin: "0",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}>
                <RefreshIcon sx={{
                  marginLeft: "-24px",
                }}/>
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
          {/* TODO: Sort wrt to sort */}
          {dashBoardData?.map((row: any) => (
            <TableRow
              key={row.collection_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* TODO:add watch icon when clicked -> addWatchlistById */}
              <TableCell component="th" scope="row" sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",  
              }}>
                <Avatar alt={undefined} src={undefined} />
                {row.name}
              </TableCell>
              <TableCell align="right">{row.floor_price}</TableCell>
              {/* TODO: Add color coding for positive and negative values */}
              <TableCell align="right">{row.One_D_floor}</TableCell>
              <TableCell align="right">{row.Seven_D_floor}</TableCell>
              <TableCell align="right">{row.volume_1d}</TableCell>
              <TableCell align="right">{row.volume_7d}</TableCell>
              <TableCell align="right">{row.volume_30d}</TableCell>
              <TableCell align="right">{row.market_cap}</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
