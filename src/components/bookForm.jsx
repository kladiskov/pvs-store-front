import React from "react";
import { getGenres } from "../services/genreService";
import { getBook, saveBook } from "../services/bookService";
import Form from "./common/form";
import Joi from "joi-browser";

class BookForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      author: "",
      numberInStock: "",
      rating: "",
      publishDate: "",
      price: ""
    },
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
      .label("Rating"),
    publishDate: Joi.date().label("Publish Date"),
    price: Joi.number()
      .required()
      .min(1)
      .max(10000)
      .label("price")
  };

  async populateGenres() {
    const { data } = await getGenres();
    this.setState({ genres: this.mapToGenre(data) });
  }

  async populateBook() {
    try {
      const bookId = this.props.match.params.id;
      if (bookId === "new") return;
      const book = await getBook(bookId);
      this.setState({ data: this.mapToData(book) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateBook();
  }
  mapToGenre(data) {
    return data.map(g => {
      return { id: g.genreId, name: g.genreName };
    });
  }

  mapToData({ data }) {
    return {
      id: data.bookId,
      title: data.title,
      genreId: data.genreId,
      author: data.author,
      numberInStock: data.stock,
      rating: data.rating,
      publishDate: data.publishDate,
      price: data.price
    };
  }

  mapToPOJO(book) {
    return {
      bookId: book.id,
      title: book.title,
      genre: {
        genreId: book.genreId
      },
      author: book.author,
      stock: book.numberInStock,
      rating: book.rating,
      active: true,
      publishDate: book.publishDate,
      price: book.price
    };
  }

  doSubmit = async () => {
    const book = { ...this.state.data };
    const item = this.mapToPOJO(book);
    await saveBook(item);
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
          {this.renderInput("publishDate", "Publish Date")}
          {this.renderInput("price", "Price")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;
