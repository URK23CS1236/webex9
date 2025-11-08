import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Ticket API calls
export const getTickets = () => api.get('/tickets');
export const getTicket = (id) => api.get(`/tickets/${id}`);
export const createTicket = (ticketData) => api.post('/tickets', ticketData);
export const updateTicket = (id, ticketData) => api.put(`/tickets/${id}`, ticketData);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);

// User-specific tickets
export const getUserTickets = () => api.get('/tickets/my-tickets');

export default api;