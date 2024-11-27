// src/services/authService.js

import API from './api';

// Existing login and register functions
export const login = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const register = async (data) => {
  const response = await API.post('/auth/register', data);
  return response.data;
};

// Add the logout function here
export const logoutUser = () => {
  // Remove token or other auth details from localStorage
  localStorage.removeItem('token');
  // Optionally, make a request to the server to handle logout
  console.log("User logged out");
};
