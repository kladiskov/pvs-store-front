import * as genresAPI from "./fakeGenreService";

const books = [
  {
    id: "1",
    title: "The Hunger Games",
    genre: { id: "1", name: "Action" },
    numberInStock: 6,
    rating: 2.5,
    author: "Suzanne Collins"
  },
  {
    id: "2",
    title: "Mockingjay",
    genre: { id: "1", name: "Action" },
    numberInStock: 5,
    rating: 2.5,
    author: "Suzanne Collins"
  },
  {
    id: "3",
    title: "Old man and the sea",
    genre: { id: "2", name: "Fiction" },
    numberInStock: 5,
    rating: 2.5,
    author: "Ernest Hemingway"
  },
  {
    id: "4",
    title: "Then there were none",
    genre: { id: "3", name: "Thriller" },
    numberInStock: 5,
    rating: 2.5,
    author: "Agatha Christie"
  },
  {
    id: "5",
    title: "Looking for alaska",
    genre: { id: "2", name: "Fiction" },
    numberInStock: 5,
    rating: 2.5,
    author: "John Green"
  },
  {
    id: "6",
    title: "Into the thin air",
    genre: { id: "4", name: "Memoir" },
    numberInStock: 5,
    rating: 2.5,
    author: "Jon Krakauer"
  },
  {
    id: "7",
    title: "Randamoozham",
    genre: { id: "2", name: "Fiction" },
    numberInStock: 5,
    rating: 2.5,
    author: "M T Vasudevan Nair"
  },
  {
    id: "8",
    title: "Catcher in the rye",
    genre: { id: "2", name: "Fiction" },
    numberInStock: 5,
    rating: 2.5,
    author: "J. D. Salinger"
  },
  {
    id: "9",
    title: "My story",
    genre: { id: "4", name: "Memoir" },
    numberInStock: 5,
    rating: 2.5,
    author: "Kamala Das"
  },
  {
    id: "10",
    title: "My experiments with truth",
    genre: { id: "5", name: "Autobiography" },
    numberInStock: 5,
    rating: 2.5,
    author: "M K Gandhi"
  }
];

export function getBooks() {
  return books;
}

export function getBook(id) {
  return books.find(book => book.id === id);
}

export function saveBook(book) {
  let bookInDb = books.find(m => m.id === book.id) || {};
  bookInDb.title = book.title;
  bookInDb.genre = genresAPI.genres.find(g => g._id === book.genreId);
  bookInDb.numberInStock = book.numberInStock;
  bookInDb.rating = book.rating;
  bookInDb.author = book.author;

  if (!bookInDb._id) {
    bookInDb._id = Date.now();
    books.push(bookInDb);
  }

  return bookInDb;
}

export function deleteBook(id) {
  let bookInDb = books.find(m => m._id === id);
  books.splice(books.indexOf(bookInDb), 1);
  return bookInDb;
}
