import axios from "axios";
const baseURL = `http://10.80.217.1:8080/api`;
const api = axios.create({
  baseURL,
});
export default api;
