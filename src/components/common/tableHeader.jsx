import React, { Component } from "react";
class TableHeader extends Component {
  state = {};
  render() {
    return (
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
    );
  }
}

export default TableHeader;
