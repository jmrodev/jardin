import api from './api/api';

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

export const logoutUser = () => {
  // Clear any stored data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const verifyToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Token verification failed');
  }
}; 