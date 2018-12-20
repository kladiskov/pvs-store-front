import React, { Component } from "react";
import { getBooks } from "../services/fakeBookService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
class Books extends Component {
  state = {
    books: [],
    genres: [],
    selectedGenre: Object,
    pageSize: 3,
    currentPage: 1
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

  render() {
    const { length: count } = this.state.books;
    const {
      currentPage,
      pageSize,
      books: allBooks,
      selectedGenre
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre.id
        ? allBooks.filter(book => book.genre.id === selectedGenre.id)
        : allBooks;
    const books = paginate(filtered, currentPage, pageSize);
    if (count === 0) return <p>There are no books</p>;
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
          <p>Hello, There are {filtered.length} books in the store.</p>
          <table className="table table-bordered table-hover" width="100%">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Like</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre.name}</td>
                  <td>{book.rating}</td>
                  <td />
                  <td>
                    <button
                      className="btn-sm"
                      onClick={() => this.handleDelete(book)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            itemsCount={filtered.length}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Books;
