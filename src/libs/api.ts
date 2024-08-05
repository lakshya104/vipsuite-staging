'use server';

import { LoginFormValues } from '@/features/LoginForm/loginTypes';
import { SignUpRequestBody } from '@/interfaces/signup';
import axios from 'axios';
import { get } from 'lodash';

export const loginApi = async ({ username, password }: LoginFormValues) => {
  try {
    const response = await axios.post(`${process.env.BASE_API_URL}/login`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error('Error during authentication:', error);
    const errorMessage = get(error, 'response.data.message', 'Unknown error');
    throw errorMessage;
  }
};

export const signup = async (formData: SignUpRequestBody) => {
  try {
    const response = await axios.post(`${process.env.BASE_API_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    const errorMessage = get(error, 'response.data.message', 'An error occurred during signup');
    throw new Error(errorMessage);
  }
};
