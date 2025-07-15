import { fetchResource } from './baseResource';

export const getTeachers = () => fetchResource('/api/teachers');
export const createTeacher = (data) => fetchResource('/api/teachers', 'POST', data);
export const updateTeacher = (id, data) => fetchResource(`/api/teachers/${id}`, 'PUT', data);
export const deleteTeacher = (id) => fetchResource(`/api/teachers/${id}`, 'DELETE'); 