import { fetchResource } from './baseResource';

export const getParents = () => fetchResource('/api/parents');
export const createParent = (data) => fetchResource('/api/parents', 'POST', data);
export const updateParent = (id, data) => fetchResource(`/api/parents/${id}`, 'PUT', data);
export const deleteParent = (id) => fetchResource(`/api/parents/${id}`, 'DELETE'); 