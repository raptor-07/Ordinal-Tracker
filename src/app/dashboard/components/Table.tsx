import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  floor: number,
  floor1DChange: number,
  floor7DChange: number,
  volume1D: number,
  volume7D: number,
  volume30D: number,
  mCap: number,
  owners: number,
  listingsSupply: number
) {
  return {
    name,
    floor,
    floor1DChange,
    floor7DChange,
    volume1D,
    volume7D,
    volume30D,
    mCap,
    owners,
    listingsSupply,
  };
}

const rows = [
  createData("Example 1", 5, 1, -3, 1000, 2000, 3000, 50000, 20, 50),
  createData("Example 2", 3, -2, 4, 1500, 2500, 3500, 60000, 25, 60),
  createData("Example 3", 4, 0, 2, 1200, 2200, 3200, 55000, 18, 45),
];

export default function CollectionTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        margin: "auto",
      }}
    >
      <Table
        sx={{ minWidth: 650, backgroundColor: "#000000" }}
        aria-label="simple table"
      >
        <TableHead
          sx={{
            boxShadow: "0px 0px 5px 0px #c5c2f1",
          }}
        >
          <TableRow>
            <TableCell>
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Name
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Floor
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                1D Floor Change
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                7D Floor Change
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Volume 1D
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Volume 7D
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Volume 30D
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                MCap
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Owners (%)
              </p>
            </TableCell>
            <TableCell align="right">
              <p
                style={{
                  fontWeight: 700,
                  margin: "0",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Listings/Supply (%)
              </p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.floor}</TableCell>
              <TableCell align="right">{row.floor1DChange}</TableCell>
              <TableCell align="right">{row.floor7DChange}</TableCell>
              <TableCell align="right">{row.volume1D}</TableCell>
              <TableCell align="right">{row.volume7D}</TableCell>
              <TableCell align="right">{row.volume30D}</TableCell>
              <TableCell align="right">{row.mCap}</TableCell>
              <TableCell align="right">{row.owners}</TableCell>
              <TableCell align="right">{row.listingsSupply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
