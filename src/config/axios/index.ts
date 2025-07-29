import axios, { AxiosInstance } from 'axios';
import { responseInterceptor, responseInterceptorError, requestInterceptor, requestInterceptorError } from "./interceptors";

import { BACKEND_URL } from '../config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
    timeout: 100000000,
});

axiosInstance.interceptors.request.use(requestInterceptor, requestInterceptorError);
axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError);

export default axiosInstance;