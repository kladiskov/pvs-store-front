import React from "react";
const book = ({ match, history, location }) => {
  return (
    <div>
      <h1>Book details</h1>
      <p>{match.params.id}</p>
      <p>{location.state.book.id}</p>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/books")}
      >
        Back
      </button>
    </div>
  );
};

export default book;
