import apiClient from './base';

const dashboardService = {
  getDemographicStats: () => apiClient.get('/dashboard/stats/demographic').then(res => res.data),
};

export default dashboardService;