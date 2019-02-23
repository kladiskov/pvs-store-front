import axios from "axios";
import { toast } from "react-toastify";
import user from "./userService";

axios.defaults.headers.common["x-auth-token"] = user.getToken();

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error");
    toast.error("An unexpected error has occured.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
