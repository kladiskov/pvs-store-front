import React from "react";
import Carousel from "react-bootstrap/Carousel";
const StoreBanner = ({ books }) => {
  return (
    <Carousel style={{ height: "300px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1533563697671-dc05a2cd7b01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
          alt="First slide"
          height="300"
          width="700"
        />
        <Carousel.Caption>
          <h3>
            Good friends, good books, and a sleepy conscience: this is the ideal
            life.
          </h3>
          <p>Mark Twain</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
          alt="Third slide"
          height="300"
          width="700"
        />

        <Carousel.Caption>
          <h3>A room without books is like a body without a soul.</h3>
          <p>Marcus Tullius Cicero</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2274&q=80"
          alt="Third slide"
          height="300"
          width="700"
        />

        <Carousel.Caption>
          <h3>
            If you only read the books that everyone else is reading, you can
            only think what everyone else is thinking.
          </h3>
          <p>Haruki Murakami</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default StoreBanner;
