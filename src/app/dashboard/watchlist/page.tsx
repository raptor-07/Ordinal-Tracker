"use client";
import { Container } from "@mui/material";
import React from "react";
import SearchWarchlist from "@/components/watchlist/SearchWatchlist";
import Table from "@/components/watchlist/Table";

interface Props {
  // Define your component props here
}

const Page: React.FC<Props> = () => {
  // Add your component logic here

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
      <SearchWarchlist />
      <Table />
    </Container>
  );
};

export default Page;
