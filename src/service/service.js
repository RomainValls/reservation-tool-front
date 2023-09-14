import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

service.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default service;
