import React, { Component } from "react";
import Item from "./item";
import CardColumns from "react-bootstrap/CardColumns";
class ItemsDisplay extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <CardColumns>
        {data.map(item => (
          <div key={item.id} className="col-xs-3">
            <Item item={item} />
          </div>
        ))}
      </CardColumns>
    );
  }
}

export default ItemsDisplay;
