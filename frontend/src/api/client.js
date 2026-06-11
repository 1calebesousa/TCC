import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Vehicles
export const vehiclesAPI = {
  getAllVehicles: (filters) => api.get('/vehicles', { params: filters }),
  getVehicleById: (id) => api.get(`/vehicles/${id}`),
  createVehicle: (data) => api.post('/vehicles', data),
  updateVehicle: (id, data) => api.put(`/vehicles/${id}`, data),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}`),
  uploadImages: (id, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post(`/vehicles/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getMyVehicles: () => api.get('/vehicles/user/my-vehicles'),
};

export default api;
