import { Container } from "@mui/material";
import React from "react";
import FloorTxns from "@/components/alerts/FloorTxns";
import WalletTxns from "@/components/alerts/WalletTxns";

interface Props {}

const MyComponent: React.FC<Props> = (props) => {
  return (
    <Container
      disableGutters
      sx={{
        minWidth: "100%",
        minHeight: "100%",
      }}
    >
      <WalletTxns />
      <FloorTxns />
    </Container>
  );
};

export default MyComponent;
