"use client";

import React, { useEffect, useState, useRef } from "react";
import { getWatchlists } from "@/actions/handleWatchlist";
import { createAlertEntry, getAlertEntries } from "@/actions/createAlertEntry";
import { deleteAlertEntry } from "@/actions/deleteAlertEntry";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import { Watchlist } from "@/components/watchlist/Table";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useReloadState } from "@/hooks/sharedReload";

function FloorTxns() {
  const user = useCurrentUser();
  let userRef = useRef(user);
  const { reload, setReload } = useReloadState();
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
  const [alertEntries, setAlertEntries] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getWatchlists(userRef);
      setIsLoading(false);
      if (data.error) {
        alert(data.error);
        if (data.error === "Please login to view your watchlist") {
          router.push("/auth/signin");
        }
      }
      if (data.watchlists) {
        console.log("watchlist data:", data.watchlists);
        setWatchlist(data.watchlists);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAlertEntries = async () => {
      const alerts: any = await getAlertEntries(userRef);
      console.log("alerts data", alerts);
      setAlertEntries(alerts);
    };
    if (watchlist.length > 0) {
      fetchAlertEntries();
    }
  }, [watchlist]);

  const setAlert = async (index: number) => {
    const isAlert = alertEntries.some(
      (item: any) => item.collectionId === watchlist[index].collection_id
    );
    if (isAlert) {
      const alertId = alertEntries.find(
        (item: any) => item.collectionId === watchlist[index].collection_id
      ).aId;
      const deleteResult = await deleteAlertEntry(userRef, alertId);
      if (deleteResult.success) {
  
        setAlertEntries(alertEntries.filter(item => item.aId !== alertId));
        setReload(!reload);
      }
    } else {
      const createResult = await createAlertEntry(userRef, watchlist[index].collection_id);
      if (createResult.success) {
        // Add the new alert to the local state
        setAlertEntries([...alertEntries, createResult.data]);
        setReload(!reload);
      }
    }
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
          overflow: "hidden",
        }}
      >
        <Table sx={{ backgroundColor: "#000000" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Alerts Enabled</TableCell>
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
                <TableCell align="right">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={alertEntries.some(
                          (alert: any) =>
                            alert.collectionId === item.collection_id
                        )}
                        onChange={() => setAlert(index)}
                        inputProps={{ "aria-label": "alerts enabled" }}
                      />
                    }
                    label={""}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default FloorTxns;
