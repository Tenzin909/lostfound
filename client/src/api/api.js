import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User API
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const getUserProfile = () => api.get('/users/profile');

// Items API
export const getItems = (filters) => api.get('/items', { params: filters });
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (itemData) => api.post('/items', itemData);
export const updateItem = (id, itemData) => api.put(`/items/${id}`, itemData);
export const deleteItem = (id) => api.delete(`/items/${id}`);
export const claimItem = (id) => api.post(`/items/${id}/claim`);

export default api;
