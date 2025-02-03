/* eslint-disable no-undef */
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://106.51.141.125:5154',
  // baseURL: "https://backend.whiteboardtec.com:5154",
  // baseURL: "https://whiteboardtec.com/backend",
  // baseURL: "https://192.168.1.153:5154",
  // baseURL: "http://192.168.1.153:5153",
  // baseURL: 'https://projectstationbe.onrender.com/',
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;