import axios from "axios";
const host = "http://localhost:5000";
const api = axios.create({
  baseURL: host,
});

export default api;
