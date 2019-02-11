import http from "./storeService";
import axios from "axios";

import * as config from "../resources/config.json";

export function getBooks() {
  return axios(config.apiEndPoint + "/books/getAll");
}

export function getBook(id) {
  return http.get(config.apiEndPoint + "/books/get/" + id);
}

export function saveBook(book) {
  return http.post(config.apiEndPoint + "/books/add", book);
}

export function deleteBook(book) {
  return http.delete(config.apiEndPoint + "/books/delete/" + book);
}
