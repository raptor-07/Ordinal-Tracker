"use client";

import CollectionTable from "../../components/dashboard/Table";
import React from "react";
import Wallets from "@/components/dashboard/Wallets";
import { useCurrentUser } from "@/hooks/current-user";
import { getWallets } from "@/actions/getWallets";

interface ChipData {
  key: number;
  label: string;
}

function DashboardPage() {
  let localStorageWallets: string = "";

  const user: any = useCurrentUser();
  let userRef: any = React.useRef(user);

  console.log("user", userRef);

  if (typeof window !== "undefined") {
    console.log("local storage initially", localStorage);
    localStorageWallets = localStorage.getItem("wallets") || "";
    // console.log("initialWallets in dashboard page", localStorageWallets);
    if (localStorageWallets === null || localStorageWallets === "") {
      localStorage.setItem("wallets", "");
    }
  }

  let initialWallets: ChipData[];

  initialWallets = localStorageWallets
    .split(",")
    .filter((wallet) => wallet.trim() !== "")
    .map((wallet, index) => ({ key: index, label: wallet }));

  const [wallets, setWallets] = React.useState<ChipData[]>(initialWallets);
  const [fetchData, setFetchData] = React.useState<boolean>(false);
  const [reload, setReload] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const initialWallets: ChipData[] = localStorageWallets
      .split(",")
      .filter((wallet) => wallet.trim() !== "")
      .map((wallet, index) => ({ key: index, label: wallet }));
    setWallets(initialWallets);
  }, [reload]);

  React.useEffect(() => {
    //edge case: checking wallets consistency between local Storage and db at initial render
    if (userRef.current !== undefined) {
      //Session 1
      getWallets(userRef).then((wallets) => {
        if (wallets !== null) {
          const newWallets = wallets.map((wallet: any, index: any) => ({
            key: index,
            label: wallet.wId,
          }));
          setWallets(newWallets);
        }
      });
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(
      "wallets",
      wallets.map((wallet) => wallet.label).join(",")
    );
  }, [wallets]);

  return (
    <div>
      <Wallets
        wallets={wallets}
        setWallets={setWallets}
        fetchData={fetchData}
        setFetchData={setFetchData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <CollectionTable
        wallets={wallets}
        setReload={setReload}
        reload={reload}
        fetchData={fetchData}
        setFetchData={setFetchData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default DashboardPage;
