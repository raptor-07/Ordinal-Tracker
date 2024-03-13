"use client";

import Box from "@mui/material/Box";
import TopBar from "../../components/dashboard/TopBar";
import { useEffect, useState } from "react";
import React from "react";
import getDashboardData from "@/actions/getDashboardData";
import { useCurrentUser } from "@/hooks/current-user";

interface LayoutProps {
  children: React.ReactNode;
}
export const PageContext = React.createContext(null);

function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  const user: any = useCurrentUser();
  console.log("user session in layout.tsx", user);

  let initialWallets: string = "";

  if (typeof window !== "undefined") {
    initialWallets = localStorage.getItem("wallets") || "";
    console.log("initialWallets in layout.tsx", initialWallets);
  }

  const [wallets, setWallets] = useState<string>(initialWallets);
  const [dashBoardData, setDashBoardData] = useState<any>([
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

  console.log("wallets in layout.tsx", wallets);

  useEffect(() => {
    console.log("useEffect is executing!!!!");
    if (wallets === "" || wallets === null) {
      console.log("wallets is empty");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      let data = await getDashboardData(user?.email, wallets);
      console.log("data", data);
      setDashBoardData(data);
      setLoading(false);
    };
    fetchData();
  }, [wallets]);

  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <TopBar
          wallets={wallets}
          setWallets={setWallets}
          setLoading={setLoading}
        />
        <PageContext.Provider value={dashBoardData}>
          {children}
        </PageContext.Provider>
      </Box>
    </div>
  );
}

export default Layout;
