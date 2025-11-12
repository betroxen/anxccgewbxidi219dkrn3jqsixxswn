import axios from 'axios';
import { authService } from '../auth/authService';

const api = axios.create({
  baseURL: process.env.API_URL || 'https://api.z-api.io', // Placeholder API URL
  withCredentials: true, // needed for HttpOnly refresh cookie
});

api.interceptors.request.use(config => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await authService.refresh();
        return api(original);
      } catch (refreshError) {
        // Force logout if refresh fails
        authService.logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);

export default api;