"use client";
import { Container } from "@mui/material";
import React from "react";
import SearchWarchlist from "@/components/watchlist/SearchWatchlist";
import Table from "@/components/watchlist/Table";

export interface Watchlist {
  name: string;
  image: string;
  collection_id: string;
  description: string;
  watchlist: boolean;
}

const Page: React.FC = () => {
  const [watchlist, setWatchlist] = React.useState<Watchlist[]>([
    {
      name: "",
      image: "",
      collection_id: "",
      description: "",
      watchlist: false,
    },
  ]);
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#000000",
        padding: "0px",
        margin: "0px",
        boxShadow: "0px 0px 2px 0px #c5c2f1",
        height: "100%",
        minWidth: "100%",
      }}
    >
      <SearchWarchlist watchlist={watchlist} setWatchlist={setWatchlist} />
      <Table watchlist={watchlist} setWatchlist={setWatchlist} />
    </Container>
  );
};

export default Page;
