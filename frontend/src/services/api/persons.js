import api from './base.js';

const personService = {
  list(personType, params = {}) {
    return api.get('/persons', { params: { ...params, person_type: personType } });
  },

  get(id, personType) {
    return api.get(`/persons/${id}`, { params: { person_type: personType } });
  },

  create(data) {
    return api.post(`/persons`, data);
  },

  update(id, data) {
    return api.put(`/persons/${id}`, data);
  },

  delete(id) {
    return api.delete(`/persons/${id}`);
  },

  getParentsByStudentId(studentId) {
    return api.get(`/students/${studentId}/parents`);
  },

  createAndLinkParent(studentId, parentData) {
    return api.post(`/students/${studentId}/parents`, parentData);
  },
};

export default personService;
