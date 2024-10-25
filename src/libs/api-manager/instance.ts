import axios from 'axios';
import { GetSession } from './manager';
import { getVipId } from '@/helpers/utils';
import { getVipIdCookie } from '../actions';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Instance.interceptors.request.use(
  async (config) => {
    try {
      const userId = await getVipIdCookie();
      const session = await GetSession();
      const { token, role } = session;
      const vipId = getVipId(role, userId, session);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (vipId) {
        config.headers['vip-profile-id'] = vipId.toString();
      }
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

const FetchInstance = async (url: string, options: RequestInit = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }

  return response.json();
};

export { Instance, FetchInstance };
