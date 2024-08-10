import axios from 'axios';
import { SignUpRequestBody } from '@/interfaces/signup';
import { Endpoints } from './constants';
import { Instance } from './instance';
import { LoginFormValues } from '@/features/LoginForm/loginTypes';
import { auth } from '@/auth';
import { get } from 'lodash';

export const GetToken = async () => {
  const session = await auth();
  const token = get(session, 'user.token', '');
  return token;
};

export const SignUp = async (formData: SignUpRequestBody) => {
  try {
    const response = await Instance.post(Endpoints.signup, formData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signup';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const Login = async (data: LoginFormValues) => {
  try {
    const response = await Instance.post(Endpoints.login, data);
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      throw errorMessage;
    }
  }
};

export const GetProfile = async () => {
  try {
    const token = await GetToken();
    const response = await Instance.get(Endpoints.getProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during fetching profile details:', error);

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during fetching profile details';
      throw new Error(errorMessage);
    }

    throw new Error('An unexpected error occurred');
  }
};

export const GetBrands = async () => {
  try {
    const response = await Instance.get(Endpoints.getBrands);
    return response.data;
  } catch (error) {
    console.error('Error during fetching brands:', error);
    if (axios.isAxiosError(error)) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'An error occurred during fetching brands';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const GetBrandDetails = async (id: number) => {
  try {
    const response = await Instance.get(`${Endpoints.getBrandDetails}/${id}?_fields=id,title,acf&_embed=acf:user`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching brand details:', error);
    if (axios.isAxiosError(error)) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'An error occurred during fetching brand details';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const GetBrandProducts = async (id: number) => {
  try {
    const token = await GetToken();
    const response = await Instance.get(`${Endpoints.getBrandProducts}=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during fetching brand products:', error);
    if (axios.isAxiosError(error)) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'An error occurred during fetching brand products';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const GetBrandProductDetail = async (id: number) => {
  try {
    const token = await GetToken();
    const response = await Instance.get(`${Endpoints.getBrandProductDetails}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during fetching brand product details:', error);
    if (axios.isAxiosError(error)) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'An error occurred during fetching brand product details';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};
