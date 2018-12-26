import React, { Component } from "react";
class TableBody extends Component {
  render() {
    const { books, onDelete } = this.props;
    return (
      <tbody>
        {books.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre.name}</td>
            <td>{book.rating}</td>
            <td />
            <td>
              <button className="btn-sm" onClick={() => onDelete(book)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
