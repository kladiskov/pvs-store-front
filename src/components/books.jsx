import React, { Component } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import BooksTable from "./booksTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ItemsDisplay from "./itemsDisplay";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    selectedGenre: null,
    pageSize: 6,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { type: "title", order: "asc" }
  };
  async componentDidMount() {
    const categories = await getGenres();
    const items = await getBooks();
    this.setState({
      books: this.mapToBook(items),
      genres: this.mapToGenre(categories),
      selectedGenre: { id: "", name: "All genres" }
    });
  }

  mapToBook({ data }) {
    return data.map(book => {
      return {
        id: book.bookId,
        title: book.title,
        genre: { id: book.genre.genreId, name: book.genre.genreName },
        numberInStock: book.stock,
        rating: book.rating,
        author: book.author,
        price: book.price,
        publishDate: book.publishDate,
        isbn: book.isbn,
        description: book.description,
        pages: book.pages
      };
    });
  }

  mapToGenre({ data }) {
    const selectedGenre = { id: "", name: "All genres" };
    return [
      selectedGenre,
      ...data.map(g => {
        return { id: g.genreId, name: g.genreName };
      })
    ];
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleDelete = async book => {
    const originalBooks = this.state.books;
    const books = this.state.books.filter(b => b.id !== book);
    this.setState({ books });
    try {
      await deleteBook(book);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This post has already been deleted.");
      }
      this.setState({ books: originalBooks });
    }
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
    const { user } = this.props;
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
          {user && (
            <Link
              to="/books/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              Add New
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          {user && (
            <BooksTable
              books={books}
              onDelete={this.handleDelete}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onLike={this.handleLike}
            />
          )}
          {!user && <ItemsDisplay data={books} />}
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
