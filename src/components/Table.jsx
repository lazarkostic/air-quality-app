import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTable = ({ data }) => {
  const renderTableBody = () => {
    return data.map((d) => (
      <TableRow key={d.column}>
        <TableCell style={{ fontWeight: "bold" }}>{d.column}</TableCell>
        <TableCell align="right">{d.data}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
