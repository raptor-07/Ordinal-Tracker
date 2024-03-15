"use client";

import CollectionTable from "../../components/dashboard/Table";
import React from "react";
import Wallets from "@/components/dashboard/Wallets";

interface ChipData {
  key: number;
  label: string;
}

function DashboardPage() {
  let localStorageWallets: string = "";

  if (typeof window !== "undefined") {
    localStorageWallets = localStorage.getItem("wallets") || "";
    console.log("initialWallets in dashboard page", localStorageWallets);
    if (localStorageWallets === null || localStorageWallets === "") {
      localStorage.setItem("wallets", "");
    }
  }

  const initialWallets: readonly ChipData[] = localStorageWallets
    .split(",")
    .filter((wallet) => wallet.trim() !== "")
    .map((wallet, index) => ({ key: index, label: wallet }));

  const [wallets, setWallets] =
    React.useState<readonly ChipData[]>(initialWallets);

  return (
    <div>
      <Wallets wallets={wallets} setWallets={setWallets} />
      <CollectionTable wallets={wallets}/>
    </div>
  );
}

export default DashboardPage;
