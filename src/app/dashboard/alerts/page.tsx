"use client";

import { Container } from "@mui/material";
import React from "react";
import FloorTxns from "@/components/alerts/FloorTxns";
import WalletTxns from "@/components/alerts/WalletTxns";
import ActiveAlerts from "@/components/alerts/ActiveAlerts";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import { SharedReloadProvider } from "@/hooks/sharedReload";

interface Props {}

const MyComponent: React.FC<Props> = (props) => {
  const user = useCurrentUser();
  const userRef: any = React.useRef(user);
  const router = useRouter();

  if (typeof window !== "undefined" && !userRef.current) {
    alert("You are not logged in 2");
    // router.push("/auth/signin");
    // return null;
  }

  return (
    <SharedReloadProvider>
      <Container
        disableGutters
        sx={{
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <WalletTxns />
        <FloorTxns />
        {/* <ActiveAlerts />s */}
      </Container>
    </SharedReloadProvider>
  );
};
export default MyComponent;
