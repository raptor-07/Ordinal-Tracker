"use client";

import Box from "@mui/material/Box";
import TopBar from "../../components/dashboard/TopBar";
import { useEffect, useState } from "react";
import getDashboardData from "@/actions/getDashboardData";
import { useCurrentUser } from "@/hooks/current-user";
import DashboardPage from "@/app/dashboard/page";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const user: any = useCurrentUser();
  console.log("user", user);

  let initialWallets: string[] = [];

  if (typeof window !== "undefined") {
    const walletsString = localStorage.getItem("wallets");
    initialWallets = walletsString ? walletsString.split(",") : [];
  }

  const [wallets, setWallets] = useState<string[]>(initialWallets);
  const [dashBoardData, setDashBoardData] = useState<any>(null);

  useEffect(() => {
    let data = getDashboardData(user?.email, localStorage.getItem("wallets"));
    setDashBoardData(data);
  }, [wallets]);

  return (
    <div>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <TopBar wallets={wallets} setWallets={setWallets} />
        <DashboardPage dashBoardData={dashBoardData} />
        {children}
      </Box>
    </div>
  );
}

export default Layout;
