import React, { Component } from "react";
import { getBooks } from "../services/fakeBookService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import BooksTable from "./booksTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { Link } from "react-router-dom";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    selectedGenre: null,
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { type: "title", order: "asc" }
  };
  componentDidMount() {
    const selectedGenre = { name: "All genres" };
    const genres = [selectedGenre, ...getGenres()];
    this.setState({ books: getBooks(), genres, selectedGenre });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleDelete = book => {
    const books = this.state.books.filter(b => b.id !== book);
    this.setState({ books });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleLike = book => {
    console.log(book.title + " liked.");
  };

  getData = () => {
    const {
      currentPage,
      pageSize,
      books: allBooks,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allBooks;
    if (searchQuery)
      filtered = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else
      filtered =
        selectedGenre && selectedGenre.id
          ? allBooks.filter(book => book.genre.id === selectedGenre.id)
          : allBooks;
    const sorted = _.orderBy(filtered, [sortColumn.type], [sortColumn.order]);
    const books = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, books };
  };

  render() {
    const { length: count } = this.state.books;
    const {
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
      genres,
      selectedGenre
    } = this.state;
    const { totalCount, books } = this.getData();
    if (count === 0) return <p>There are no books availabe in the store.</p>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Hello, There are {totalCount} books in the store.</p>
          <Link
            to="/books/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Add New
          </Link>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <BooksTable
            books={books}
            onDelete={this.handleDelete}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onLike={this.handleLike}
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
