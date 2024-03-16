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
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CollectionTable({
  wallets,
}: {
  wallets: readonly any[];
}) {
  const user: any = useCurrentUser();
  // console.log("user", user);
  let userRef: any = useRef(user);
  // console.log("userRef", userRef);

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
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    console.log("useEffect is executing!!!!");
    if (wallets.length === 0 && !userRef) {
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
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const walletString = wallets.map((wallet) => wallet.label).join(",");

      let data: any = await getDashboardData(
        userRef.current.email,
        walletString
      );

      if (data.error) {
        if(data.error === "No Collections found") {
          //Session 1 | Wallets 0
          console.log("No collections found in DB");
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
          setLoading(false);
          return;
        }
        console.error("Error in getting data", data.error);
        alert("Error in getting data. You may need to login again!");
        setLoading(false);
        router.push("/auth/signin");
        return;
      }

      if (data.wallets) {
        //Session 1 | Wallets 0
        localStorage.setItem("wallets", data.wallets);
        setDashBoardData(data.data);
        setLoading(false);
        return;
      }
      console.log("data for dashboard on client", data);
      setDashBoardData(data);
      setLoading(false);
    };
    fetchData();
  }, [wallets]);

  return loading ? (
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
          <TableRow>
            <TableCell>
              <p
                style={{
                  fontWeight: 700,
                  marginLeft: "8px",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
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
                Listings/Supply (%)
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
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.floor_price}</TableCell>
              <TableCell align="right">{row.One_D_floor}</TableCell>
              <TableCell align="right">{row.Seven_D_floor}</TableCell>
              <TableCell align="right">{row.volume_1d}</TableCell>
              <TableCell align="right">{row.volume_7d}</TableCell>
              <TableCell align="right">{row.volume_30d}</TableCell>
              <TableCell align="right">{row.market_cap}</TableCell>
              <TableCell align="right">N/A</TableCell>{" "}
              {/* Owners (%) data not provided */}
              <TableCell align="right">N/A</TableCell>{" "}
              {/* Listings/Supply (%) data not provided */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
