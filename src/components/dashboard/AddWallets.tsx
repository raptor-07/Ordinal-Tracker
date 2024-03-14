import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { validate, Network } from "bitcoin-address-validation";

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function AddWallets() {
  let localStorageWallets: string = "";

  if (typeof window !== "undefined") {
    localStorageWallets = localStorage.getItem("wallets") || "";
    console.log("initialWallets in layout.tsx", localStorageWallets);
  }

  if (localStorageWallets === null || localStorageWallets === "") {
    localStorage.setItem("wallets", "");
  }

  const initialWallets: readonly ChipData[] = localStorageWallets
    .split(",")
    .filter((wallet) => wallet.trim() !== "")
    .map((wallet, index) => ({ key: index, label: wallet }));

  const [wallets, setWallets] =
    React.useState<readonly ChipData[]>(initialWallets);

  React.useEffect(() => {
    localStorage.setItem(
      "wallets",
      wallets.map((wallet) => wallet.label).join(",")
    );
  }, [wallets]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setWallets((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const HandleAddWallet = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const wallet = (event.target as HTMLInputElement).value;

      if (wallet === "") {
        return;
      }

      if (wallets.find((chip) => chip.label === wallet)) {
        (event.target as HTMLInputElement).value = "";
        return;
      }

      if (!validate(wallet, Network.mainnet)) {
        (event.target as HTMLInputElement).value = "";
        return;
      }

      setWallets((chips) => [...chips, { key: chips.length, label: wallet }]);
      (event.target as HTMLInputElement).value = "";
    }
  };

  function formatLabel(label: string): string {
    if (label.length === 0) return label;
    const firstFour = label.substring(0, 4);
    const lastFour = label.substring(label.length - 4);
    const middleDots = "....";
    return `${firstFour}${middleDots}${lastFour}`;
  }

  return (
    <Paper
      sx={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0,
        m: 0,
        backgroundColor: "#000000",
      }}
      component="ul"
    >
      <Container
        sx={{
          display: "flex",
          backgroundColor: "#000000",
          padding: "0px",
          margin: "0px",
          minWidth: "100%",
          height: "100%",
          boxShadow: "0px 0px 2px 0px #c5c2f1",
        }}
      >
        <TextField
          id="filled-basic"
          label="Add Wallet"
          variant="standard"
          onKeyDown={HandleAddWallet}
          style={{
            borderRadius: "50px",
            margin: "5px",
          }}
        />
        {wallets.length > 0 &&
          wallets.map((data) => {
            let icon;

            return (
              <ListItem
                key={data.key}
                sx={{
                  backgroundColor: "#000000",
                }}
              >
                <Chip
                  icon={icon}
                  label={formatLabel(data.label)}
                  onDelete={handleDelete(data)}
                  sx={{
                    fontWeight: 700,
                    width: "100%",
                    height: "100%",
                    padding: "5px",
                    textDecorationColor: "#4a40c9",
                    textShadow: "0 0 2px #2a67a2",
                    backgroundColor: "#000000",
                    fontSize: "1.1rem",
                  }}
                />
              </ListItem>
            );
          })}
      </Container>
    </Paper>
  );
}

export default AddWallets;
