import { fetchResource } from './baseResource';

export const getStatistics = () => fetchResource('/statistics');
