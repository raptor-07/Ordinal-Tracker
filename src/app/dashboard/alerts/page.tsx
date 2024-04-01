"use client";

import { Alert, Container, Typography } from "@mui/material";
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

  // if (typeof window !== "undefined" && !userRef.current) {
  //   alert("You are not logged in");
  //   router.push("/auth/signin");
  //   return null;
  // }

  return (
    <SharedReloadProvider>
      <Container
        disableGutters
        sx={{
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Alert severity="warning" sx={{
          marginBottom: "20px",
          marginTop: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Typography variant="h6">
          Make Sure to drop your Telegram chatID in your profile for some lightning-fast alerts!
          </Typography>
          </ Alert>
        <WalletTxns />
        <FloorTxns />
        {/* <ActiveAlerts />s */}
      </Container>
    </SharedReloadProvider>
  );
};
export default MyComponent;
