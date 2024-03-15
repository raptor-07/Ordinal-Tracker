"use client";

import * as React from "react";
import { useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CollectionTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        margin: "auto",
        padding: "0",
      }}
    >
      <Table sx={{ minWidth: 650, backgroundColor: "#000000" }}>
        <TableHead
          sx={{
            // boxShadow: "0px 0px 5px 0px #c5c2f1",
            padding: "12px",
          }}
        >
          <TableRow
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0",
                padding: "10px 0 10px 0",
            }}
          >
            <TableCell
              sx={{
                flexGrow: 1,
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  margin: "0 0 0 4px",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                }}
              >
                Name
              </p>
            </TableCell>
            <TableCell
              align="left"
              sx={{
                flexGrow: 2,
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                }}
              >
                Description
              </p>
            </TableCell>
            <TableCell
              align="left"
              sx={{
                flexGrow: 1,
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  padding: "0",
                }}
              >
                Watchlist
              </p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
}
