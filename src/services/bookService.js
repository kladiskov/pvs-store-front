import http from "./storeService";

const apiEndPoint = "http://localhost:8080/pvs-store/api/books";

export function getBooks() {
  return http.get(apiEndPoint + "/getAll");
}

export function getBook(id) {
  return http.get(apiEndPoint + "/get/" + id);
}

export function saveBook(book) {
  return http.post(apiEndPoint + "/add", book);
}
