import React, { Component } from "react";
import { getBooks } from "../services/fakeBookService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import BooksTable from "./booksTable";
import _ from "lodash";
class Books extends Component {
  state = {
    books: [],
    genres: [],
    selectedGenre: Object,
    pageSize: 3,
    currentPage: 1,
    sortColumn: { type: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ name: "All genres" }, ...getGenres()];
    this.setState({ books: getBooks(), genres });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre });
    this.setState({ currentPage: 1 });
  };

  handleDelete = book => {
    const books = this.state.books.filter(b => b.id !== book.id);
    this.setState({ books });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getBooks = () => {
    const {
      currentPage,
      pageSize,
      books: allBooks,
      selectedGenre,
      sortColumn
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre.id
        ? allBooks.filter(book => book.genre.id === selectedGenre.id)
        : allBooks;
    const sorted = _.orderBy(filtered, [sortColumn.type], [sortColumn.order]);
    const books = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, books };
  };

  render() {
    const { length: count } = this.state.books;
    const { currentPage, pageSize, sortColumn } = this.state;
    const { totalCount, books } = this.getBooks();
    if (count === 0) return <p>There are no books availabe in the store.</p>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={this.state.genres}
            selectedGenre={this.state.selectedGenre}
            onGenreSelect={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Hello, There are {totalCount} books in the store.</p>
          <BooksTable
            books={books}
            onDelete={this.handleDelete}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            itemsCount={totalCount}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Books;
