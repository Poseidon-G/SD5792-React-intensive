import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the base URL for the API
const BASE_URL = 'https://ccmernapp-11a99251a1a7.herokuapp.com'; // Replace with your actual API base URL

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    toast.error('Request call failed');
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error('Response received with error');
    return Promise.reject(error);
  }
);

export default axiosInstance;