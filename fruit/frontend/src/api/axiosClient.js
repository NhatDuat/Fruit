import axios from 'axios';

const dev = 'http://localhost:4000/api/v1';

const axiosClient = axios.create({
  baseURL: dev,
  timeout: 8000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosClient;
