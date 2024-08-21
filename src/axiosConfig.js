import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to include the token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
