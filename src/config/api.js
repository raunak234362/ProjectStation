/* eslint-disable no-undef */
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://106.51.141.125:5154', // API URL
  // baseURL: 'https://192.168.1.153:5154', // API URL
  // baseURL: 'https://106.51.141.125:5154', // API URL
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle tokens
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - redirecting to login.");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
