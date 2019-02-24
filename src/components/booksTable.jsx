import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";
import auth from "../services/userService";

class BooksTable extends Component {
  columns = [
    {
      type: "title",
      label: "Title",
      content: book => (
        <Link to={{ pathname: `/books/${book.id}`, state: { book } }}>
          {book.title}
        </Link>
      )
    },
    { type: "author", label: "Author" },
    { type: "genre.name", label: "Genre" },
    { type: "rating", label: "Rating" },
    {
      key: "like",
      content: book => (
        <Like like={book.liked} onClick={() => this.props.onLike(book)} />
      )
    }
  ];

  deleteColumn = {
    key: "action",
    content: book => (
      <button
        onClick={() => this.props.onDelete(book.id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin === "true") this.columns.push(this.deleteColumn);
  }
  render() {
    const { books, onSort, sortColumn } = this.props;
    return (
      <Table
        books={books}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BooksTable;
