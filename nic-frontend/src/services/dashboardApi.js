import axios from 'axios';

const dashboardApi = axios.create({
  baseURL: 'http://localhost:8082/api', // NIC service
});

dashboardApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default dashboardApi;
