import axios, { AxiosInstance } from 'axios';

import { BACKEND_URL } from '../config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
    timeout: 100000000,
});

export default axiosInstance;