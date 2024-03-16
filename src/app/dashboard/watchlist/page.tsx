"use client";

import { Container } from "@mui/material";
import React from "react";
import SearchWatchlist from "@/components/watchlist/SearchWatchlist";
import CollectionTable from "@/components/watchlist/Table";
import { Watchlist } from "@/components/watchlist/Table";

const Page: React.FC = () => {
  const [watchlist, setWatchlist] = React.useState<Watchlist[]>([
    {
      name: "",
      image: "",
      collection_id: "",
      description: "",
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
      <SearchWatchlist watchlist={watchlist} setWatchlist={setWatchlist} />
      <CollectionTable watchlist={watchlist} setWatchlist={setWatchlist} />
    </Container>
  );
};

export default Page;
