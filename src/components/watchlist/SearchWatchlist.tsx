import * as React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { getWatchlists } from "@/actions/handleWatchlist";
import { useCurrentUser } from "@/hooks/current-user";
export interface Watchlist {
  name: string;
  image: string;
  collection_id: string;
  description: string;
  watchlist: boolean;
}
function SearchWatchlist() {
  const user: any = useCurrentUser();
  let userRef: any = React.useRef(user);

  const [watchlist, setWatchlist] = React.useState<Watchlist[]>([
    {
      name: "",
      image: "",
      collection_id: "",
      description: "",
      watchlist: false,
    },
  ]);

  React.useEffect(() => {
    //get watchlist data from db
    const fetchData = async () => {
      const data = await getWatchlists(userRef.current);
      if (data.error) {
        alert(data.error);
      }
    };
    fetchData();
  });

  const handleAddWatchlist = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const watchlist = event.target as HTMLInputElement;
    }
  };

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
          onKeyDown={handleAddWatchlist}
          style={{
            borderRadius: "50px",
            margin: "0px",
          }}
          sx={{
            minWidth: "100%",
            "&placeholder": {
              textAlign: "center",
              fontSize: "30px",
            },
          }}
        />
      </Container>
    </Paper>
  );
}

export default SearchWatchlist;
