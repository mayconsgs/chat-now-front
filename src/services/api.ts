import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT
    ? Number(process.env.REACT_APP_API_TIMEOUT)
    : undefined,
  withCredentials: true,
});

export default api;
