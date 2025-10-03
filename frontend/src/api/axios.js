
import axios from 'axios';
import { getToken, removeToken } from '../utils/storage';
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://notevoult-8cj2.onrender.com';

const API = axios.create({
  baseURL: BASE_URL, // Backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach JWT
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle expired tokens
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is 401 Unauthorized (e.g., expired token)
    if (error.response && error.response.status === 401) {
      console.log('Token expired or unauthorized. Logging out.');
      // Optionally clear storage and redirect to login
      removeToken();
      // window.location.href = '/login'; // Force reload for full state reset
    }
    return Promise.reject(error);
  }
);

export default API;