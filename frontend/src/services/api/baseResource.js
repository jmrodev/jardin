import axios from 'axios';
import apiClient from './base'; // Asegurarnos de usar el apiClient configurado

function createResource(resource) {
  const resourceURL = `/${resource}`;

  return {
    list: (params) => apiClient.get(resourceURL, { params }),
    get: (id) => apiClient.get(`${resourceURL}/${id}`),
    create: (data) => apiClient.post(resourceURL, data),
    update: (id, data) => apiClient.put(`${resourceURL}/${id}`, data),
    delete: (id) => apiClient.delete(`${resourceURL}/${id}`),
  };
}

export default createResource; 