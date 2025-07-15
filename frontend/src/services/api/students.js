import { fetchResource } from './baseResource';

export const getStudents = () => fetchResource('/students');
export const createStudent = (data) => fetchResource('/students', 'POST', data);
export const updateStudent = (id, data) => fetchResource(`/students/${id}`, 'PUT', data);
export const deleteStudent = (id) => fetchResource(`/students/${id}`, 'DELETE');
export const getStudent = (id) => fetchResource(`/students/${id}`); 