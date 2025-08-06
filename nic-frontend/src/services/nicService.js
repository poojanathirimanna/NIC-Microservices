import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/nic';

export const uploadNICFiles = async (files, token) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });

  return response.data;
};
