import apiClient from './base';

export const getStatistics = () => apiClient.get('/statistics').then(res => res.data);
