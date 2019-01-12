import React, { Component } from "react";
class TableHeader extends Component {
  sort = type => {
    const sortColumn = { ...this.props.sortColumn };
    if (type === sortColumn.type) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.type = type;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const sortColumn = { ...this.props.sortColumn };
    if (column.type !== sortColumn.type) return null;
    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    } else {
      return <i className="fa fa-sort-desc" />;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.type || column.key}
              onClick={() => this.sort(column.type)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
