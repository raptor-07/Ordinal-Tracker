import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { validate, Network } from "bitcoin-address-validation";
import { useCurrentUser } from "@/hooks/current-user";
import { addNewWallet } from "@/actions/addNewWallet";
import { deleteWallet } from "@/actions/deleteWallet";

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function SearchWatchlist() {
  const handleDelete = (chipToDelete: ChipData) => async () => {};

  const HandleAddWallet = async (event: React.KeyboardEvent) => {};

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
          padding: "10px 0 0px 0",
          margin: "0px",
          minWidth: "100%",
          height: "100%",
          boxShadow: "0px 0px 2px 0px #c5c2f1",
        }}
        disableGutters
      >
        <TextField
          id="filled-basic"
          label="Add Collection to watchlist"
          variant="standard"
          onKeyDown={HandleAddWallet}
          style={{
            borderRadius: "50px",
            margin: "0px",
          }}
          sx={{
            minWidth: "100%",
            "&placeholder": {
                textAlign: "center",
                fontSize: "30px",
            }
          }}
        />
      </Container>
    </Paper>
  );
}

export default SearchWatchlist;
