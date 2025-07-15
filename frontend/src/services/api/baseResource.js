import api from './api';

export async function fetchResource(endpoint, method = 'GET', data) {
  try {
    const config = {
      url: endpoint,
      method,
    };
    if (data) config.data = data;
    const response = await api(config);
    return response.data;
  } catch (error) {
    // Axios ya maneja los errores globales con los interceptores
    throw error;
  }
} 