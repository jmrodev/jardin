import { fetchResource } from './baseResource';

export const getPersons = () => fetchResource('/persons');
export const createPerson = (data) => fetchResource('/persons', 'POST', data);
export const updatePerson = (id, data) => fetchResource(`/persons/${id}`, 'PUT', data);
export const deletePerson = (id) => fetchResource(`/persons/${id}`, 'DELETE'); 