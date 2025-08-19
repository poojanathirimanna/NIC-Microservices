import axios from 'axios';

const dashboardApi = axios.create({
  baseURL: 'http://localhost:8082/api', // NIC service
});

dashboardApi.interceptors.request.use((config) => {// Add the token to the request headers
  // This will be used to authenticate requests to the NIC service
  // and to access the dashboard records.
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default dashboardApi;
