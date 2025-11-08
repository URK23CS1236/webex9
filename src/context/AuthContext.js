// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout, getCurrentUser } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('AuthProvider mounted, checking authentication...');
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token found in localStorage:', !!token);
      
      if (token) {
        console.log('Fetching current user...');
        const userData = await getCurrentUser();
        console.log('User data received:', userData);
        setUser(userData);
      } else {
        console.log('No token found, user remains null');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
      console.log('Auth check completed, loading set to false');
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      console.log('Attempting login with:', email);
      
      const result = await authLogin(email, password);
      console.log('Login API response:', result);
      
      if (result.token && result.user) {
        localStorage.setItem('token', result.token);
        console.log('Token stored in localStorage');
        setUser(result.user);
        console.log('User state updated:', result.user);
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      console.error('Login error:', message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
      console.log('Login process completed');
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);
      const result = await authRegister(userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};