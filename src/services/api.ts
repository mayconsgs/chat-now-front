import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:3333" : "",
  timeout: process.env.NODE_ENV === "production" ? 2000 : undefined,
  withCredentials: true,
});

export default api;
