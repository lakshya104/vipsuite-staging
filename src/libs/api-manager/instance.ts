import axios from 'axios';
import { getAuthData } from '../actions';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Instance.interceptors.request.use(
  async (config) => {
    try {
      const { token, profileId } = await getAuthData();
      if (token) config.headers.Authorization = 'Bearer ' + token;
      if (profileId) config.headers['profile-id'] = profileId;
    } catch (error) {
      console.error('Error getting session:', error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleAxiosResponseError(error: any) {
  console.error(
    'Unexpected server error :',
    error?.message,
    'error message :',
    error?.response?.data?.message,
    'error status code : ',
    error?.response?.data?.code,
  );
  if (error.status === 500) {
    const message = 'An unexpected error occurred on the server. Please try again later.';
    return Promise.reject(new Error(message));
  } else if (error.response) {
    const message = error.response?.data?.message || error?.message || 'An error occurred';
    return Promise.reject(new Error(message));
  } else if (error.request) {
    console.error('No response received:', error?.request);
    return Promise.reject(new Error('No response received from the server.'));
  } else {
    console.error('Error', error?.message);
    return Promise.reject(new Error('An error occurred while setting up the request.'));
  }
}

Instance.interceptors.response.use((response) => {
  return response;
}, handleAxiosResponseError);

const InstanceWithTokenOnly = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

InstanceWithTokenOnly.interceptors.request.use(
  async (config) => {
    try {
      const { token } = await getAuthData();
      if (token) config.headers.Authorization = 'Bearer ' + token;
    } catch (error) {
      console.error('Error getting session:', error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

InstanceWithTokenOnly.interceptors.response.use((response) => {
  return response;
}, handleAxiosResponseError);

const InstanceWithoutHeaders = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

InstanceWithoutHeaders.interceptors.response.use((response) => {
  return response;
}, handleAxiosResponseError);

export { Instance, InstanceWithoutHeaders, InstanceWithTokenOnly };
