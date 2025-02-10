import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9999', // Ensure this matches your backend URL and port
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  // withCredentials: true, // Needed if backend requires cookies for authentication
});

export default axiosInstance;
