import http from "./storeService";
import { apiEndPoint } from "../resources/config.json";

export function addUser(data) {
  return http.post(apiEndPoint + "/user/add", data);
}
