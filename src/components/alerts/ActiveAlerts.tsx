"use client";

import React from "react";
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
  Button,
  Avatar,
  CircularProgress,
  Box,
} from "@mui/material";
import { getAlertEntries } from "@/actions/getAlertEntries";
import { useCurrentUser } from "@/hooks/current-user";

interface ActiveAlertsProps {
  reload: Boolean;
  setReload: React.Dispatch<React.SetStateAction<Boolean>>;
}

const ActiveAlerts: React.FC<ActiveAlertsProps> = (
  props: ActiveAlertsProps
) => {
  const user = useCurrentUser();
  let userRef = React.useRef(user);

  const [isLoading, setIsLoading] = React.useState(true);
  const [alertEntries, setAlertEntries] = React.useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const entries: any = await getAlertEntries(userRef);
    console.log("active entries for this user", entries);
    setAlertEntries(entries);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, [props.reload]);

  const deleteAlertHandler = (aId: string) => {
    // Implement your delete logic here
    console.log(`Delete alert with id: ${aId}`);
  };

  return isLoading ? (
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
        Transaction Alerts
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
        Transaction Alerts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>TrackType</TableCell>
              <TableCell>RefPrice</TableCell>
              <TableCell>Direction</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alertEntries.map((entry) => (
              <TableRow key={entry.aId}>
                <TableCell>
                  <Avatar src={entry.Image} />
                  <Typography>{entry.name}</Typography>
                </TableCell>
                <TableCell>{entry.TrackType}</TableCell>
                <TableCell>{entry.refPrice}</TableCell>
                <TableCell>{entry.direction ? "Up" : "Down"}</TableCell>
                <TableCell>{entry.value}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteAlertHandler(entry.aId)}>
                    Delete Alert
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

export default ActiveAlerts;
