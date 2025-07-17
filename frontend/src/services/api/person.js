import { fetchResource } from './baseResource';

const personTypeEndpoints = {
  student: '/students',
  teacher: '/teachers',
  parent: '/parents',
  director: '/directors'
};

const getEndpoint = (personType) => personTypeEndpoints[personType] || '/persons';

export const getPersons = (personType) => fetchResource(getEndpoint(personType));
export const getPerson = (id, personType) => fetchResource(`${getEndpoint(personType)}/${id}`);
export const createPerson = (data, personType) => fetchResource(getEndpoint(personType), 'POST', data);
export const updatePerson = (id, data, personType) => fetchResource(`${getEndpoint(personType)}/${id}`, 'PUT', data);
export const deletePerson = (id, personType) => fetchResource(`${getEndpoint(personType)}/${id}`, 'DELETE');
