import api from './base.js';

const personService = {
  list(personType, params = {}) {
    return api.get(`/${personType}s`, { params });
  },

  get(id, personType) {
    return api.get(`/${personType}s/${id}`);
  },

  create(personType, data) {
    return api.post(`/${personType}s`, data);
  },

  update(id, personType, data) {
    return api.put(`/${personType}s/${id}`, data);
  },

  delete(id, personType) {
    return api.delete(`/${personType}s/${id}`);
  },

  getParentsByStudentId(studentId) {
    return api.get(`/students/${studentId}/parents`);
  },

  createAndLinkParent(studentId, parentData) {
    return api.post(`/students/${studentId}/parents`, parentData);
  },
};

export default personService;
