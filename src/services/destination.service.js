import api from './api';

export const destinationService = {
  getAll: (params) => api.get('/destinations', { params }),
  getById: (id) => api.get(`/destinations/${id}`),
  // Admin
  create: (data) => api.post('/admin/destinations', data),
  update: (id, data) => api.put(`/admin/destinations/${id}`, data),
  delete: (id) => api.delete(`/admin/destinations/${id}`),
};
