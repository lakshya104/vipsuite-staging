import axios from 'axios';
import { VipSignUpRequestBody, UserProfile, AddressInput, Session } from '@/interfaces';
import { Endpoints } from './constants';
import { LoginFormValues } from '@/features/LoginForm/loginTypes';
import { auth } from '@/auth';
import TAGS from '../apiTags';
import { FetchInstance, Instance } from './instance';

export const GetToken = async () => {
  const session = await auth();
  const token = (session?.user as unknown as Session)?.token;
  return token;
};

export const GetSession = async () => {
  const session = await auth();
  return session?.user as unknown as Session;
};

export const GetLoginUserId = async () => {
  const session = await auth();
  const id = (session?.user as unknown as Session)?.vip_profile_id;
  return id;
};

export const GetTokenAndEmail = async () => {
  const session = await auth();
  const user = session?.user as unknown as Session;
  return {
    token: user?.token,
    email: user?.email,
  };
};

export const GetUserIdAndToken = async () => {
  const session = await auth();
  const user = session?.user as unknown as Session;
  return {
    id: user?.vip_profile_id,
    token: user?.token,
  };
};

export const GetCustomerId = async () => {
  const session = await auth();
  const user = session?.user as unknown as Session;
  return user?.id;
};

export const GetUserRole = async () => {
  const session = await auth();
  const user = session?.user as unknown as Session;
  return user?.role;
};

export const GetCustomerIdTokenAndUserId = async () => {
  const session = await auth();
  const user = session?.user as unknown as Session;
  return {
    id: user?.id,
    token: user?.token,
    userId: user?.vip_profile_id,
  };
};

export const VipSignUp = async (formData: VipSignUpRequestBody) => {
  try {
    const response = await Instance.post(Endpoints.vipSignup, formData);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AgentSignUp = async (formData: any) => {
  try {
    const response = await Instance.post(Endpoints.agentSignup, formData);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BrandSignUp = async (formData: any) => {
  try {
    const response = await Instance.post(Endpoints.brandSignup, formData);
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

export const AgentProfileUpdate = async (agentId: number, token: string, formData: FormData) => {
  try {
    const response = await Instance.post(Endpoints.agentProfileUpdate(agentId), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'auto',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during profile update:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during profile update';
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

export const GetProfile = async (token: string, vipId?: number | string | undefined) => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (vipId) {
    headers['vip-profile-id'] = vipId.toString();
  }
  return await FetchInstance(Endpoints.getProfile, {
    headers,
  });
};

export const GetVipProfile = async (token: string, vipId: number) => {
  return await FetchInstance(Endpoints.getProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
  });
};

export const GetAgentProfile = async () => {
  const session = await auth();
  const token = (session?.user as unknown as Session).token;
  return await FetchInstance(Endpoints.getProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: [TAGS.GET_AGENT_PROFILE] },
  });
};

export const GetDashboardContent = async (vipId: number, token: string) => {
  try {
    const response = await Instance.get(Endpoints.getDashboardContent, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch dashboard content');
  }
};

export const GetDashboard = async (vipId: number, token: string) => {
  try {
    const response = await Instance.get(Endpoints.getDashboard, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch dashboard');
  }
};

export const GetVipSearch = async (keyword: string, token: string, vipId: number) => {
  return await FetchInstance(Endpoints.vipSearch(keyword), {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
  });
};

export const GetBrandDetails = async (id: number, token: string, vipId: number | string) => {
  return await FetchInstance(Endpoints.getBrandDetails(id), {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: [TAGS.GET_BRAND_DETAILS] },
  });
};

export const GetBrandProducts = async (id: number, token: string, vipId: number | string) => {
  return await FetchInstance(Endpoints.getBrandProducts(id), {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: [TAGS.GET_BRAND_PRODUCTS] },
  });
};

export const GetBrandProductDetail = async (id: number, token: string, vipId: number) => {
  return await FetchInstance(Endpoints.getBrandProductDetails(id), {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: [TAGS.GET_PRODUCT_DETAILS] },
  });
};

export const GetSignupContent = async () => {
  return await FetchInstance(Endpoints.getSignupContent);
};

export const GetVipEvents = async (token: string, vipId: number | string) => {
  return await FetchInstance(Endpoints.getVipEvents, {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: [TAGS.GET_EVENTS] },
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

export const CreateVipProfile = async (token: string, profile: UserProfile) => {
  try {
    const response = await Instance.post(Endpoints.createProfile, profile, {
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

export const GetAllOrders = async (token: string, vipId: number | string, nonce: string) => {
  const id = await GetCustomerId();
  return await FetchInstance(Endpoints.getAllOrders(id), {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
      'X-WC-Store-API-Nonce': nonce,
    },
    next: { tags: [TAGS.GET_MYORDERS] },
  });
};
export const GetAllOrdersClient = async (token: string, id: number, vipId: number) => {
  return await FetchInstance(Endpoints.getAllOrders(id), {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: [TAGS.GET_MYORDERS] },
  });
};

export const GetOrderById = async (id: number, token: string, vipId: number | string) => {
  return await FetchInstance(Endpoints.getOrderById(id), {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
  });
};

export const GetVipEventDetails = async (id: number, token: string, vipId: number | string) => {
  return await FetchInstance(`${Endpoints.getVipEventDetails(id)}?_fields=id,title,acf,is_wishlisted`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: [TAGS.GET_EVENT_DETAILS] },
  });
};

export const GetVipCart = async (token: string) => {
  return await FetchInstance(Endpoints.getVipCart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: [TAGS.GET_VIP_CART] },
  });
};

export const RemoveVipCartItem = async (key: string, token: string, nonce: string) => {
  try {
    const response = await Instance.post(
      Endpoints.removeVipCartItem(key),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-WC-Store-API-Nonce': nonce,
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

export const RemoveAllVipCartItems = async (token: string, nonce: string) => {
  try {
    const response = await Instance.delete(Endpoints.removeAllCartItems, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-WC-Store-API-Nonce': nonce,
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreateOrder = async (data: any, token: string, nonce: string, vipId: number) => {
  try {
    const response = await Instance.post(Endpoints.createOrder, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-WC-Store-API-Nonce': nonce,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during creating order:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.message || 'An error occurred during creating order';
      throw errorMessage;
    }
  }
};

export const GetVipOpportunities = async (vipId: number, token: string) => {
  try {
    const response = await Instance.get(Endpoints.getVipOpportunities, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Opportunities');
  }
};

export const SendRsvp = async (data: FormData, token: string | null, vipId: number) => {
  try {
    const response = await Instance.post(Endpoints.sendRsvp, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during sending Rsvp:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.message || 'An error occurred during submitting response';
      throw new Error(`Not able to submit response ${errorMessage}`);
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

export const GetVipRsvpEvents = async (token: string, vipId: number | string) => {
  return await FetchInstance(Endpoints.getVipRsvpEvents, {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
  });
};

export const GetVipWishlistItems = async (token: string, vipId: number | string) => {
  return await FetchInstance(Endpoints.getWishlistItems, {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: ['getWishlistItems'] },
  });
};

export const GetAddresses = async (token: string, vipId: number | string) => {
  return await FetchInstance(Endpoints.getAddresses, {
    headers: {
      Authorization: `Bearer ${token}`,
      'vip-profile-id': vipId?.toString(),
    },
    next: { tags: [TAGS.GET_ADDRESSES] },
  });
};

export const addUpdateAddress = async (
  id: number,
  token: string,
  address: AddressInput,
  addressId: string | undefined,
) => {
  try {
    let url = `${Endpoints.getAddresses}`;
    if (addressId) url = `${Endpoints.getAddresses}/${addressId}`;
    const response = await Instance.post(url, address, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': id?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.message || 'An error occurred during add address';
      throw errorMessage;
    }
  }
};

export const DeleteAddress = async (vipId: number, addressId: string, token: string) => {
  try {
    const response = await Instance.delete(Endpoints.deleteAddress(addressId), {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
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

export const GetVipOpportunityDetails = async (id: number, vipId: number, token: string) => {
  try {
    const response = await Instance.get(Endpoints.getVipOpportunityDetails(id), {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Opportunities');
  }
};

export const OrderFeedback = async (
  token: string,
  vipId: number | string,
  orderNumber: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => {
  try {
    const response = await Instance.post(Endpoints.orderFeedback(orderNumber), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during submitting feedback';
      throw errorMessage;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddItemToCart = async (token: string | null, data: any, nonce: string | null, vipId: number) => {
  try {
    const addItemResponse = await Instance.post(Endpoints.addItemToCart, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-WC-Store-API-Nonce': nonce,
        'vip-profile-id': vipId.toString(),
      },
    });
    return addItemResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred during adding item to cart';
      throw errorMessage;
    }
  }
};

export const GetNonce = async (token: string) => {
  const response = await Instance.get(Endpoints.getVipCart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const nonce = response.headers['nonce'];
  return nonce;
};

export const FetchCartItemsAndNonce = async (token: string) => {
  try {
    const response = await Instance.get(Endpoints.getVipCart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const nonce = response.headers['nonce'];
    const items = response.data;
    return { items, nonce };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during fetching cart items';
      throw errorMessage;
    }
  }
};

export const EventFeedback = async (
  token: string,
  vipId: number | string,
  eventId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => {
  try {
    const response = await Instance.post(Endpoints.eventFeedback(eventId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during submitting feedback';
      throw errorMessage;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddToWishlist = async (token: string, vipId: any, postId: number) => {
  try {
    const response = await Instance.post(
      Endpoints.addToWishlist(postId),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'vip-profile-id': vipId?.toString(),
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred while adding item to wishlist';
      throw errorMessage;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DeleteFromWishlist = async (token: string, vipId: any, postId: number) => {
  try {
    const response = await Instance.delete(Endpoints.addToWishlist(postId), {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': vipId?.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred while removing item from wishlist';
      throw errorMessage;
    }
  }
};

export const ReferaVIP = async (
  id: number,
  token: string | null,
  data: {
    email: string;
    instagram_handle: string;
    tiktok_handle: string;
  },
) => {
  try {
    const response = await Instance.post(Endpoints.referVIP, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': id.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during Refer a VIP';
      throw errorMessage;
    }
  }
};

export const MakeRequestSubmit = async (
  id: number,
  token: string | null,
  data: {
    request_content: string;
  },
) => {
  try {
    const response = await Instance.post(`${Endpoints.makeRequest}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'vip-profile-id': id.toString(),
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'An error occurred during Make a Request';
      throw errorMessage;
    }
  }
};

export const GetPageContent = async (slug: string) => {
  return await FetchInstance(Endpoints.getPageContent(slug));
};

export const GetAllVips = async (token: string) => {
  try {
    const response = await Instance.get(Endpoints.getAllVip, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Opportunities');
  }
};

export const GetMenuItems = async () => {
  return await FetchInstance(Endpoints.getMenuItems);
};
