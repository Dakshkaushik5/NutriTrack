import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

// Auth endpoints
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Plan endpoints
export const submitPlanRequest = (formData) => API.post('/plans/submit', formData);

// Payment endpoints
export const createOrder = (orderData) => API.post('/payment/create-order', orderData);
export const verifyPayment = (paymentData) => API.post('/payment/verify', paymentData);

// Dashboard endpoints
export const getUserDashboard = () => API.get('/dashboard/me');
export const getAdminDashboard = () => API.get('/admin/plan-requests');


// Admin endpoints
export const updatePlanStatus = (id, status) => API.put(`/admin/plan-requests/${id}`, { status });