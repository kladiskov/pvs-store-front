import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = props => {
  const { books, onDelete } = props;
  return (
    <table className="table table-bordered table-hover" width="100%">
      <TableHeader />
      <TableBody books={books} onDelete={onDelete} />
    </table>
  );
};

export default Table;
