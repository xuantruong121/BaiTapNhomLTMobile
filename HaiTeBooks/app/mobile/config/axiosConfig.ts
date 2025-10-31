import axios from 'axios';

let authToken: string | null = null;

const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.156:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const setAuthToken = (token?: string) => {
  authToken = token || null;
  if (authToken) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${authToken}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};

// Gắn token cho mọi request (kể cả khi defaults bị reset)
axiosInstance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default axiosInstance;