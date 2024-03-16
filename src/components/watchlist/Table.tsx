"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getWatchlists } from "@/actions/handleWatchlist";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

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
      }
      if (data.watchlists) {
        setWatchlist(data.watchlists);
      }
    };
    fetchData();
  }, []);

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
            boxShadow: "0px 0px 5px 0px #c5c2f1",
            padding: "0",
            minWidth: "100%",
          }}
        >
          <TableRow
            sx={{
              // display: "flex",
              // minWidth: "100%",
              // justifyContent: "space-between",
              margin: "0",
              padding: "0",
            }}
          >
            <TableCell
              sx={{
                flexGrow: 1,
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  margin: "0 0 0 8px",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                }}
              >
                Name
              </p>
            </TableCell>
            <TableCell
              align="left"
              sx={{
                flexGrow: 2,
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  margin: "0 0 0 8px",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                }}
              >
                Description
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
