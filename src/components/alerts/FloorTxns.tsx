"use client";

import React from "react";
import { getWatchlists } from "@/actions/handleWatchlist";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import { Watchlist } from "@/components/watchlist/Table";
import { createAlertEntry } from "@/actions/createAlertEntry";
import {
  Table,
  Container,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  Avatar,
  FormControl,
  CircularProgress,
  Box,
} from "@mui/material";

interface FloorTxnsProps {
  setReload: React.Dispatch<React.SetStateAction<Boolean>>;
}

const FloorTxns: React.FC<FloorTxnsProps> = (props: FloorTxnsProps) => {
  const user = useCurrentUser();
  let userRef = React.useRef(user);

  const [isLoading, setIsLoading] = React.useState(true);
  const [watchlist, setWatchlist] = React.useState<Watchlist[]>([
    {
      name: "",
      image: "",
      collection_id: "",
      description: "",
    },
  ]);
  const router = useRouter();

  // Initialize alertData state as an array of objects
  const [alertData, setAlertData] = React.useState<Array<any>>(
    watchlist.map(() => ({
      trackingType: "",
      refPrice: "",
      trackingDirection: "",
      trackingValue: "",
      collectionId: "",
    }))
  );

  React.useEffect(() => {
    //get watchlist data from db - initial fetch
    const fetchData = async () => {
      const data: any = await getWatchlists(userRef);
      setIsLoading(false);
      if (data.error) {
        if (data.error === "Please login to view your watchlist") {
          alert(data.error);
          router.push("/auth/signin");
        }
        alert(data.error);
      }
      if (data.watchlists) {
        console.log(
          "watchlist data in floor alerts component",
          data.watchlists
        );
        setWatchlist(data.watchlists);
        setAlertData(
          data.watchlists.map((item: any) => ({
            trackingType: "",
            refPrice: "",
            trackingDirection: "",
            trackingValue: "",
            collectionId: item.collection_id,
          }))
        );
        console.log(data.watchlists);
      }
    };
    fetchData();
  }, []);

  const setAlert = async (index: number) => {
    console.log("alertData sent to server", alertData[index]);
    // const result: any = await createAlertEntry(userRef, alertData);

    // if (result.error) {
    //   alert(result.error);
    //   router.push("/auth/signin");
    // }
    // // props.setReload(true);
  };

  return isLoading ? (
    <>
      <Container
        disableGutters
        sx={{
          padding: "3%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: "75%",
        }}
      >
        <Typography variant="h4" component="h2" align="left" gutterBottom>
          Floor Alerts
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    </>
  ) : (
    <Container
      sx={{
        padding: "3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "75%",
      }}
    >
      <Typography variant="h4" component="h2" align="left" gutterBottom>
        Floor Alerts
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#000000",
          boxShadow: "0px 0px 1px 0px #c5c2f1",
          overflow: "hidden", // Add this to disable the scroll bar
        }}
      >
        <Table
          sx={{
            backgroundColor: "#000000",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Tracking Type</TableCell>
              <TableCell>Ref Price</TableCell>
              <TableCell>Tracking Direction</TableCell>
              <TableCell>Tracking Value(%)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchlist.map((item, index) => (
              <TableRow key={item.collection_id}>
                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginBottom: "-1.103px",
                  }}
                >
                  <Avatar src={item.image} alt={item.name} />
                  <Typography variant="body1">{item.name}</Typography>
                </TableCell>
                <TableCell>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputLabel style={{ color: "#989a9c" }}>Choose</InputLabel>
                    <Select
                      label="Choose"
                      sx={{ width: "100%" }}
                      value={alertData[index].trackingType}
                      onChange={(e) => {
                        const newAlertData = [...alertData];
                        newAlertData[index].trackingType = e.target.value;
                        setAlertData(newAlertData);
                      }}
                    >
                      <MenuItem value={"Percent Movement"}>Percent</MenuItem>
                      <MenuItem value={"Absolute Value"}>Absolute</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Enter Price"
                    value={alertData[index].refPrice}
                    onChange={(e) => {
                      const newAlertData = [...alertData];
                      newAlertData[index].refPrice = e.target.value;
                      setAlertData(newAlertData);
                    }}
                    sx={{
                      width: "100%",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputLabel style={{ color: "#989a9c" }}>Choose</InputLabel>
                    <Select
                      label="Choose"
                      sx={{
                        width: "100%",
                      }}
                      value={alertData[index].trackingDirection}
                      onChange={(e) => {
                        const newAlertData = [...alertData];
                        newAlertData[index].trackingDirection = e.target.value;
                        setAlertData(newAlertData);
                      }}
                    >
                      <MenuItem value={"Up"}>Up</MenuItem>
                      <MenuItem value={"Down"}>Down</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Enter Value"
                    value={alertData[index].trackingValue}
                    onChange={(e) => {
                      const newAlertData = [...alertData];
                      newAlertData[index].trackingValue = e.target.value;
                      setAlertData(newAlertData);
                    }}
                    sx={{
                      width: "100%",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setAlert(index)}
                  >
                    Set Alert
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FloorTxns;
