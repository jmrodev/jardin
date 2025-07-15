import { fetchResource } from './baseResource';

export const getStudents = () => fetchResource('/api/students');
export const createStudent = (data) => fetchResource('/api/students', 'POST', data);
export const updateStudent = (id, data) => fetchResource(`/api/students/${id}`, 'PUT', data);
export const deleteStudent = (id) => fetchResource(`/api/students/${id}`, 'DELETE'); 