import axios from 'axios';
import { SignUpRequestBody, UserProfile, Session, Address } from '@/interfaces';
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

export const ResetPassword = async ({
  email,
  code,
  password,
}: {
  email: string | null;
  code: string;
  password: string;
}) => {
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

export const GetVipEventDetails = async (id: number, token: string) => {
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
    const response = await Instance.post(
      Endpoints.removeVipCartItem(key),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-WC-Store-API-Nonce': '1e6447610f',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error during removing cart item:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.message || 'An error occurred during removing item';
      throw errorMessage;
    }
  }
};

export const GetVipOpportunities = async () => {
  const token = await GetToken();
  return await FetchInstance(Endpoints.getVipOpportunities, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SendRsvp = async (data: any, token: string) => {
  try {
    const response = await Instance.post(Endpoints.sendRsvp, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during sending Rsvp:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signup';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const LogOut = async (token: string) => {
  try {
    const response = await Instance.post(
      Endpoints.logOut,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error during signing out:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.message || 'An error occurred during signing out';
      throw errorMessage;
    }
  }
};

export const GetVipRsvpEvents = async () => {
  const token = await GetToken();
  const id = await GetLoginUserId();
  if (typeof id === 'number') {
    return await FetchInstance(Endpoints.getVipRsvpEvents(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    {
      const errorMessage = 'An error occurred during fetching RSVP Events';
      throw errorMessage;
    }
  }
};

export const GetAddresses = async (id: number) => {
  const token = await GetToken();
  return await FetchInstance(`${Endpoints.getAddresses}/${id}/addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUpdateAddress = async (id: number, token: string, address: Address, addressId: number | undefined) => {
  try {
    let url = `${Endpoints.getAddresses}/${id}/addresses`;
    if (addressId) url = `${Endpoints.getAddresses}/${id}/addresses/${addressId}`;
    const response = await Instance.post(url, address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during add address';
      throw errorMessage;
    }
  }
};

export const DeleteAddress = async (vipId: number, addressId: number, token: string) => {
  try {
    const response = await Instance.delete(Endpoints.deleteAddress(vipId, addressId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during add address';
      throw errorMessage;
    }
  }
};
export const GetVipOpportunityDetails = async (id: number) => {
  const token = await GetToken();
  return await FetchInstance(`${Endpoints.getVipOpportunityDetails}/${id}?_fields=id,title,acf`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
