import axios from 'axios';
import { getAuthData } from '../actions';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Instance.interceptors.request.use(
  async (config) => {
    try {
      const { token, vipId } = await getAuthData();
      if (token) config.headers.Authorization = 'Bearer ' + token;
      if (vipId) config.headers['vip-profile-id'] = vipId;
    } catch (error) {
      console.error('Error getting session:', error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      'Unexpected server error :',
      error.message,
      'error message :',
      error.response.data.message,
      'error status code : ',
      error.response.data.code,
    );
    if (error.response) {
      const message = error.response.data.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      console.error('No response received:', error.request);
      return Promise.reject(new Error('No response received from the server.'));
    } else {
      console.error('Error', error.message);
      return Promise.reject(new Error('An error occurred while setting up the request.'));
    }
  },
);

const InstanceWithoutHeaders = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const FetchInstance = async (url: string, options: RequestInit = {}) => {
//   const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
//   const response = await fetch(`${baseURL}${url}`, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options.headers || {}),
//     },
//     cache: 'no-store',
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'An error occurred');
//   }

//   return response.json();
// };

export { Instance, InstanceWithoutHeaders };
