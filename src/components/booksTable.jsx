import React, { Component } from "react";
import Table from "./common/Table";
class BooksTable extends Component {
  state = {};
  render() {
    const { books, onDelete } = this.props;
    return <Table books={books} onDelete={onDelete} />;
  }
}

export default BooksTable;
