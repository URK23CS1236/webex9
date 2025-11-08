// src/services/auth.js
import axios from 'axios';
import { mockLogin, mockGetCurrentUser } from './mockAuth'; // Import mock functions

const API_BASE_URL = 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use mock functions for testing - remove when backend is ready
export const login = async (email, password) => {
  // Comment out the real API call and use mock for testing
  // const response = await authApi.post('/auth/login', { email, password });
  // return response.data;
  
  return await mockLogin(email, password);
};

export const register = async (userData) => {
  const response = await authApi.post('/auth/register', userData);
  return response.data;
};

export const logout = () => {
  // Token is removed from localStorage in the context
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  // Comment out the real API call and use mock for testing
  // const response = await authApi.get('/auth/me', {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });
  // return response.data;
  
  return await mockGetCurrentUser();
};