import { fetchResource } from './baseResource';

export const getTeachers = () => fetchResource('/teachers');
export const createTeacher = (data) => fetchResource('/teachers', 'POST', data);
export const updateTeacher = (id, data) => fetchResource(`/teachers/${id}`, 'PUT', data);
export const deleteTeacher = (id) => fetchResource(`/teachers/${id}`, 'DELETE'); 