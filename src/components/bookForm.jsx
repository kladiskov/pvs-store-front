import React from "react";
import { getGenres } from "../services/fakeGenreService";
import { getBook, saveBook } from "../services/fakeBookService";
import Form from "./common/form";
import Joi from "joi-browser";

class BookForm extends Form {
  state = {
    data: { title: "", genreId: "", author: "", numberInStock: "", rating: "" },
    errors: {},
    genres: []
  };

  schema = {
    id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    author: Joi.string()
      .required()
      .label("Author"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(1000)
      .label("Stock"),
    rating: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rating")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const bookId = this.props.match.params.id;
    if (bookId === "new") return;
    const book = getBook(bookId);
    console.log(book);
    if (!book) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToData(book) });
  }
  mapToData(book) {
    return {
      id: book.id,
      title: book.title,
      genreId: book.genre.id,
      author: book.author,
      numberInStock: book.numberInStock,
      rating: book.rating
    };
  }

  doSubmit = () => {
    saveBook(this.state.data);
    this.props.history.push("/books");
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Book details</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("author", "Author")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("rating", "Rating")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;
