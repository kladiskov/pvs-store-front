import React from "react";
const ListGroup = props => {
  const { genres, selectedGenre, onGenreSelect } = props;
  return (
    <ul>
      {genres.map(genre => (
        <li
          key={genre.id}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelect(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
