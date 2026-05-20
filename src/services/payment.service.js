import api from './api';

export const paymentService = {
  getConfig: () => api.get('/payment/config'),
  createOrder: (data) => api.post('/payment/create-order', data),
  verifyPayment: (data) => api.post('/payment/verify', data),
};

export const aiService = {
  generateTripPlan: (data) => api.post('/ai/trip-plan', data),
};
