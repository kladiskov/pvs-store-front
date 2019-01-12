import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = props => {
  const { books, columns, onSort, sortColumn } = props;
  return (
    <table className="table table-bordered table-hover" width="100%">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={books} columns={columns} />
    </table>
  );
};

export default Table;
