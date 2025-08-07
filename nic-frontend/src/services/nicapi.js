import axios from 'axios';

const nicapi = axios.create({
  baseURL: 'http://localhost:8082/api/nic', // NIC microservice
});

// Automatically attach JWT token from localStorage
nicapi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default nicapi;
