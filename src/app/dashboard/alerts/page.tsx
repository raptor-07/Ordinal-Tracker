"use client";

import { Container } from "@mui/material";
import React from "react";
import FloorTxns from "@/components/alerts/FloorTxns";
import WalletTxns from "@/components/alerts/WalletTxns";
import ActiveAlerts from "@/components/alerts/ActiveAlerts";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";

interface Props {}

const MyComponent: React.FC<Props> = (props) => {
  const user = useCurrentUser();
  const router = useRouter();

  if (typeof window !== "undefined" && !user) {
    alert("You are not logged in");
    router.push("/auth/signin");
    return null;
  }

  const [reload, setReload] = React.useState<Boolean>(false);
  return (
    <Container
      disableGutters
      sx={{
        minWidth: "100%",
        minHeight: "100%",
      }}
    >
      <WalletTxns />
      <FloorTxns setReload={setReload} />
      <ActiveAlerts reload={reload} setReload={setReload} />
    </Container>
  );
};

export default MyComponent;
