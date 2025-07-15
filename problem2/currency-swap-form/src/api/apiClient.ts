import axios from "axios";

import { ENDPOINTS } from "../constants";

export const apiClient = axios.create({
  baseURL: ENDPOINTS.RATES,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // handle logout, refresh token, v.v.
      //window.location.href = "/login";
    }
    // log , show toast, v.v.
    return Promise.reject(error);
  }
); 