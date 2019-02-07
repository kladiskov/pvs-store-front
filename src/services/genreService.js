import http from "./storeService";

export function getGenres() {
  return http.get("http://localhost:8080/pvs-store/api/genres/getAll");
}

export function getGenre(id) {
  return http.get("http://localhost:8080/pvs-store/api/genres/get/" + id);
}
