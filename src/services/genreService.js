import http from "./storeService";
import * as config from "../resources/config.json";

export function getGenres() {
  return http.get(config.apiEndPoint + "/genres/getAll");
}

export function getGenre(id) {
  return http.get(config.apiEndPoint + "/genres/get/" + id);
}
