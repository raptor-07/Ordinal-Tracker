"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { getWatchlists, addWatchListBySlug } from "@/actions/handleWatchlist";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import { sortingTable } from "../dashboard/Table";

function SearchWatchlist({
  watchlist,
  setWatchlist,
  sort,
  setSort,
  isLoading,
  setIsLoading,
}: {
  watchlist: any;
  setWatchlist: React.Dispatch<React.SetStateAction<any>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user: any = useCurrentUser();
  const router = useRouter();
  let userRef: any = React.useRef(user);
  if (!userRef) {
    alert("Please login to add a collection to your watchlist");
    router.push("/auth/signin");
  }
  console.log("userRef", userRef, user);

  const handleaddWatchListBySlug = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      const slug = event.target as HTMLInputElement;
      //add watchlist server action
      const data: any = await addWatchListBySlug(slug.value, userRef);
      if (data.error) {
        if (
          data.error === "Please login to add a collection to your watchlist"
        ) {
          alert(data.error);
          router.push("/auth/signin");
        } else {
          alert(data.error);
          slug.value = "";
          return;
        }
      }
      //if watchlist added successfully -> force a rerender of the watchlist page
      // console.log("latest watchlist table data", data);
      const currentWatchlistTableData: any =
        localStorage.getItem("watchlistTableData");
      // console.log("currentWatchlistTableData", currentWatchlistTableData);
      const appendedWatchlistData = JSON.parse(currentWatchlistTableData).push(
        data
      );
      // console.log("appendedWatchlistData", appendedWatchlistData);
      const sortedData = sortingTable(sort, [appendedWatchlistData]);

      // console.log("sortedData", sortedData);
      localStorage.setItem("watchlistTableData", JSON.stringify(sortedData));

      setWatchlist(sortedData);
      setIsLoading(false);

      slug.value = "";

      return;
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0,
        m: 0,
        backgroundColor: "#000000",
      }}
      component="ul"
    >
      <Container
        sx={{
          display: "flex",
          backgroundColor: "#000000",
          padding: "10px 0 0px 0",
          margin: "0px",
          minWidth: "100%",
          height: "100%",
          boxShadow: "0px 0px 2px 0px #c5c2f1",
        }}
        disableGutters
      >
        <TextField
          id="filled-basic"
          label="Add Collection to watchlist"
          variant="standard"
          onKeyDown={handleaddWatchListBySlug}
          style={{
            borderRadius: "50px",
            margin: "0px",
          }}
          sx={{
            minWidth: "100%",
            "&placeholder": {
              textAlign: "center",
              fontSize: "30px",
            },
          }}
        />
      </Container>
    </Paper>
  );
}

export default SearchWatchlist;
