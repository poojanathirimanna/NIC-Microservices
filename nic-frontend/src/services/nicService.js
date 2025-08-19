import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/nic';

export const uploadNICFiles = async (files, token) => {// Function to upload NIC files
  const formData = new FormData(); // Create a new FormData object
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await axios.post(`${BASE_URL}/upload`, formData, {// Send files to the server
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });

  return response.data;
};
