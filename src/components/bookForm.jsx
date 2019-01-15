import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
class BookForm extends Component {
  state = {
    data: { title: "", genreId: "", author: "", numberInStock: "", rating: "" },
    errors: {},
    genres: []
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
  }
  render() {
    return (
      <div>
        <h1>Book details</h1>
        <form onSubmit={this.handleSubmit()}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input type="text" name="author" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select type="text" name="genre" className="form-control">
              {this.state.genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numberInStocks">Stock</label>
            <input type="text" name="numberInStocks" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input type="text" name="rating" className="form-control" />
          </div>
          <button className="btn btn-primary" disabled={this.handleValidate()}>
            Save
          </button>
        </form>
      </div>
    );
  }

  handleSubmit = () => {
    console.log("submitted.");
  };

  handleValidate = () => {
    return false;
  };
}

export default BookForm;
