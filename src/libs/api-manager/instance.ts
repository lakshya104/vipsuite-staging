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
    next: { revalidate: 10 },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }

  return response.json();
};

export { Instance, FetchInstance };
