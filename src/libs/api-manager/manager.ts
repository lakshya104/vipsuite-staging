import axios from 'axios';
import { SignUpRequestBody, UserProfile, Session } from '@/interfaces';
import { Endpoints } from './constants';
import { FetchInstance, Instance } from './instance';
import { LoginFormValues } from '@/features/LoginForm/loginTypes';
import { auth } from '@/auth';

export const GetToken = async () => {
  const session = await auth();
  const token = (session?.user as unknown as Session).token;
  return token;
};

export const GetLoginUserId = async () => {
  const session = await auth();
  const id = (session?.user as unknown as Session).vip_profile_id;
  return id;
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

export const GetProfile = async (token: string) => {
  try {
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

export const GetBrands = async (token: string) => {
  try {
    const response = await Instance.get(Endpoints.getBrands, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const GetBrandDetails = async (id: number, token: string) => {
  try {
    const response = await Instance.get(`${Endpoints.getBrandDetails}/${id}?_fields=id,title,acf&_embed=acf:user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const token = await GetToken();
  return await FetchInstance(`${Endpoints.getBrandProductDetails}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetSignupContent = async () => {
  return await FetchInstance(Endpoints.getSignupContent);
};

export const GetVipEvents = async () => {
  const token = await GetToken();
  return await FetchInstance(Endpoints.getVipEvents, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetProfileBuilderContent = async () => {
  return await FetchInstance(Endpoints.getProfileBuilderContent);
};

export const UpdateProfile = async (id: number, token: string, profile: UserProfile) => {
  try {
    const response = await Instance.post(`${Endpoints.updateProfile}/${id}`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during update profile';
      throw errorMessage;
    }
  }
};

export const ForgotPassword = async ({ email }: { email: string }) => {
  try {
    const response = await Instance.post(Endpoints.forgotPassword, { email });
    return response.data;
  } catch (error) {
    console.error('Error during sending link:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during sending link';
      throw errorMessage;
    }
  }
};

export const ResetPassword = async ({ email, code, password }: { email: string; code: string; password: string }) => {
  try {
    const response = await Instance.post(Endpoints.resetPassword, { email, code, password });
    return response.data;
  } catch (error) {
    console.error('Error during resetting password:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during password reset';
      throw errorMessage;
    }
  }
};

export const GetAllOrders = async () => {
  const token = await GetToken();
  return await FetchInstance(Endpoints.getAllOrders, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetOrderById = async (id: number) => {
  const token = await GetToken();
  return await FetchInstance(`${Endpoints.getOrderById}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetVipEventDetails = async (id: number) => {
  const token = await GetToken();
  return await FetchInstance(`${Endpoints.getVipEventDetails}/${id}?_fields=id,title,acf`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetVipCart = async () => {
  const token = await GetToken();
  return await FetchInstance(Endpoints.getVipCart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const RemoveVipCartItem = async (key: string, token: string) => {
  try {
    const response = await Instance.post(Endpoints.removeVipCartItem(key), {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-WC-Store-API-Nonce': '08353d22df',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during removing cart item:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.message || 'An error occurred during removing item';
      throw errorMessage;
    }
  }
};
