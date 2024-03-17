"use client";

import CollectionTable from "../../components/dashboard/Table";
import React from "react";
import Wallets from "@/components/dashboard/Wallets";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";

interface ChipData {
  key: number;
  label: string;
}

function DashboardPage() {
  let localStorageWallets: string = "";

  const user: any = useCurrentUser();
  let userRef: any = React.useRef(user);

  console.log("user in dashboard page", user);
  console.log("userRef in dashboard page", userRef);

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
    const [reload, setReload] = React.useState<boolean>(false);

  React.useEffect(() => {
    const initialWallets: readonly ChipData[] = localStorageWallets
      .split(",")
      .filter((wallet) => wallet.trim() !== "")
      .map((wallet, index) => ({ key: index, label: wallet }));
    setWallets(initialWallets);
  }, [reload]);

  return (
    <div>
      <Wallets wallets={wallets} setWallets={setWallets} />
      <CollectionTable wallets={wallets} setReload={setReload} reload={reload}/>
    </div>
  );
}

export default DashboardPage;
