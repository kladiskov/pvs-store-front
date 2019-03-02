import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
class StoreModal extends Component {
  state = {};
  render() {
    const { item } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Book Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{item.title}</h4>
          <p>ISBN: {item.isbn}</p>
          <p>Author: {item.author}</p>
          <p>Published Date: {item.publishDate}</p>
          <p>Price:{item.price}</p>
          <p>Description:{item.description}</p>
          <p>Pages: {item.pages}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default StoreModal;
