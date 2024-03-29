"use client";

import { Container } from "@mui/material";
import React from "react";
import SearchWatchlist from "@/components/watchlist/SearchWatchlist";
import CollectionTable from "@/components/watchlist/Table";
import { Watchlist } from "@/components/watchlist/Table";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const user = useCurrentUser();
  const userRef: any = React.useRef(user);
  const router = useRouter();

  const [watchlist, setWatchlist] = React.useState<Watchlist[]>([
    {
      name: "",
      image: "",
      collection_id: "",
      description: "",
      owner_count: 0,
      nft_count: 0,
      quantity: 0,
      volume_1d: 0,
      volume_7d: 0,
      volume_30d: 0,
      market_cap: 0,
      floor_price: 0,
      One_D_floor: 0,
      Seven_D_floor: 0,
    },
  ]);
  const [sort, setSort] = React.useState<string>("floor");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // if (typeof window !== "undefined" && !userRef.current) {
  //   alert("You are not logged in");
  //   router.push("/auth/signin");
  //   return null;
  // }

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
      <SearchWatchlist watchlist={watchlist} setWatchlist={setWatchlist} sort={sort} setSort={setSort} isLoading={isLoading} setIsLoading={setIsLoading}/>
      <CollectionTable watchlist={watchlist} setWatchlist={setWatchlist} sort={sort} setSort={setSort} isLoading={isLoading} setIsLoading={setIsLoading}/>
    </Container>
  );
};

export default Page;
