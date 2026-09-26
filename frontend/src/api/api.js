import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach admin token automatically if present (for /admin panel screens)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('igcse_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
