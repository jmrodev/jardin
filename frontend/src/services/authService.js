import api from './api/base.js';

const authService = {
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async verifyToken() {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Token verification failed');
    }
  }
};

export default authService; 