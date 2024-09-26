import { auth } from '@/auth';
import { Session } from '@/interfaces';
import axios from 'axios';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

const FetchInstanceWithHeaders = async (url: string, options: RequestInit = {}) => {
  const session = await auth();
  const token = (session?.user as unknown as Session).token;
  const vipId = (session?.user as unknown as Session).vip_profile_id;
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData);
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

export { Instance, FetchInstance, FetchInstanceWithHeaders };
