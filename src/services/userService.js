import http from "./storeService";
import { apiEndPoint } from "../resources/config.json";
import jwt_decode from "jwt-decode";

const TOKEN_KEY = "token";

http.setToken(getToken());

export function addUser(data) {
  return http.post(apiEndPoint + "/user/register", data);
}

export async function login(data) {
  const { data: token } = await http.post(apiEndPoint + "/user/login", data);
  localStorage.setItem(TOKEN_KEY, token.token);
}

export function loginWithToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const data = jwt_decode(token);
    return data;
  } catch (ex) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithToken,
  getToken
};
