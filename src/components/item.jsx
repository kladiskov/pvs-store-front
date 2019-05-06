import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./item.css";
import StoreModal from "./common/storeModal";
class Item extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }
  render() {
    let modalClose = () => this.setState({ modalShow: false });
    const { item } = this.props;
    return (
      <React.Fragment>
        <StoreModal
          show={this.state.modalShow}
          onHide={modalClose}
          item={item}
        />
        <Card style={({ width: "16rem" }, { height: "16rem" })}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              <span>ISBN: {item.isbn}</span>
              Author: {item.author}
              <br />
              Price: Rs {item.price}
            </Card.Text>
            <ButtonGroup aria-label="Item actions">
              <Button variant="secondary">
                <i className="fa fa-heart-o" aria-hidden="true" />
              </Button>
              <Button
                variant="info"
                onClick={() => this.setState({ modalShow: true })}
              >
                Quick View
              </Button>
              <Button variant="secondary">
                <i className="fa fa-cart-plus" aria-hidden="true" />
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default Item;
