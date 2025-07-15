import { fetchResource } from './baseResource';

export const getParents = () => fetchResource('/parents');
export const createParent = (data) => fetchResource('/parents', 'POST', data);
export const updateParent = (id, data) => fetchResource(`/parents/${id}`, 'PUT', data);
export const deleteParent = (id) => fetchResource(`/parents/${id}`, 'DELETE'); 