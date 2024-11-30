import axios from 'axios';
import {
  VipSignUpRequestBody,
  UserProfile,
  AddressInput,
  Session,
  BrandSignUpRequestBody,
  AgentSignUpRequestBody,
  OrderFeedbackData,
  EventFeedbackData,
  CreateOrderData,
} from '@/interfaces';
import { Endpoints } from './constants';
import { LoginFormValues } from '@/features/LoginForm/loginTypes';
import { auth } from '@/auth';
import { Instance, InstanceWithoutHeaders } from './instance';

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
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during signup';
    throw new Error(errorMessage);
  }
};

export const AgentSignUp = async (formData: AgentSignUpRequestBody) => {
  try {
    const response = await Instance.post(Endpoints.agentSignup, formData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during signup';
    throw new Error(errorMessage);
  }
};

export const BrandSignUp = async (formData: BrandSignUpRequestBody) => {
  try {
    const response = await Instance.post(Endpoints.brandSignup, formData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during signup';
    throw new Error(errorMessage);
  }
};

export const AgentProfileUpdate = async (agentId: number, formData: FormData, token: string) => {
  try {
    const response = await InstanceWithoutHeaders.post(Endpoints.agentProfileUpdate(agentId), formData, {
      headers: {
        'Content-Type': 'auto',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error during profile update:', error.response.data?.message || 'No error message available');
      throw new Error(error.response.data?.message || 'Failed to update agent profile.');
    } else {
      console.error('Error during profile update:', error);
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred during the profile update.');
    }
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
    const response = await Instance.get(Endpoints.getProfile);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch profile content');
  }
};

export const GetAgentProfile = async (token: string) => {
  try {
    const response = await InstanceWithoutHeaders.get(Endpoints.getProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch profile content');
  }
};

export const GetVipProfile = async () => {
  try {
    const response = await Instance.get(Endpoints.getProfile);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch vip profile');
  }
};

export const GetEditVipProfile = async (token: string, vipId: number) => {
  try {
    const response = await InstanceWithoutHeaders.get(Endpoints.getProfile, {
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
    throw new Error('Failed to fetch vip profile');
  }
};

export const GetDashboardContent = async () => {
  try {
    const response = await Instance.get(Endpoints.getDashboardContent);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch dashboard content');
  }
};

export const GetDashboard = async () => {
  try {
    const response = await Instance.get(Endpoints.getDashboard);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch dashboard');
  }
};

export const GetVipSearch = async (keyword: string) => {
  try {
    const response = await Instance.get(Endpoints.vipSearch(keyword));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch search results');
  }
};

export const GetBrandDetails = async (id: number) => {
  try {
    const response = await Instance.get(Endpoints.getBrandDetails(id));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Brand Details');
  }
};

export const GetBrandProducts = async (id: number) => {
  try {
    const response = await Instance.get(Endpoints.getBrandProducts(id));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Brand Products');
  }
};

export const GetBrandProductDetail = async (id: number) => {
  try {
    const response = await Instance.get(Endpoints.getBrandProductDetails(id));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Product Details');
  }
};
export const GetProducts = async () => {
  try {
    const response = await Instance.get(Endpoints.getProducts);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Products');
  }
};

export const GetSignupContent = async () => {
  try {
    const response = await Instance.get(Endpoints.getSignupContent);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Signup Content');
  }
};

export const GetVipEvents = async () => {
  try {
    const response = await Instance.get(Endpoints.getVipEvents);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Events');
  }
};

export const GetProfileBuilderContent = async () => {
  try {
    const response = await Instance.get(Endpoints.getProfileBuilderContent);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch profile builder content');
  }
};

export const UpdateProfile = async (id: number, profile: UserProfile) => {
  try {
    const response = await Instance.post(`${Endpoints.updateProfile}/${id}`, profile);
    return response.data;
  } catch (error) {
    console.error('Error during updating profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during updating profile';
    throw new Error(errorMessage);
  }
};

export const CreateVipProfile = async (profile: UserProfile) => {
  try {
    const response = await Instance.post(Endpoints.createProfile, profile);
    return response.data;
  } catch (error) {
    console.error('Error during creating profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during creating profile';
    throw new Error(errorMessage);
  }
};

export const ForgotPassword = async ({ email }: { email: string }) => {
  try {
    const response = await Instance.post(Endpoints.forgotPassword, { email });
    return response.data;
  } catch (error) {
    console.error('Error during sending link:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error during sending link';
    throw new Error(errorMessage);
  }
};

export const ResetPassword = async ({ email, code, password }: { email: string; code: number; password: string }) => {
  try {
    const response = await Instance.post(Endpoints.resetPassword, { email, code, password });
    return response.data;
  } catch (error) {
    console.error('Error during resetting password:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error during resetting password';
    throw new Error(errorMessage);
  }
};

export const GetAllOrders = async (page = 1) => {
  const id = await GetCustomerId();
  try {
    const response = await Instance.get(Endpoints.getAllOrders(id, page));
    const totalOrders = response.headers['x-wp-total'];
    const totalPages = response.headers['x-wp-totalpages'];
    return {
      orders: response.data,
      totalOrders,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Orders');
  }
};

export const GetOrderById = async (id: number) => {
  try {
    const response = await Instance.get(Endpoints.getOrderById(id));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Order Details');
  }
};

export const GetVipEventDetails = async (id: number) => {
  try {
    const response = await Instance.get(`${Endpoints.getVipEventDetails(id)}?_fields=id,title,acf,is_wishlisted`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to Event Details');
  }
};

export const GetVipCart = async () => {
  try {
    const response = await Instance.get(Endpoints.getVipCart);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to Cart Details');
  }
};

export const RemoveVipCartItem = async (id: number) => {
  try {
    const response = await Instance.delete(Endpoints.removeVipCartItem(id));
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred during removing item from cart';
    throw new Error(errorMessage);
  }
};

export const RemoveAllVipCartItems = async () => {
  try {
    const response = await Instance.delete(Endpoints.removeAllCartItems);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred during removing items from cart';
    throw new Error(errorMessage);
  }
};

export const CreateOrder = async (data: CreateOrderData) => {
  try {
    const response = await Instance.post(Endpoints.createOrder, data);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during creating order';
    throw new Error(errorMessage);
  }
};

export const GetVipOpportunities = async (opportunityCategory?: string) => {
  try {
    const response = await Instance.get(Endpoints.getVipOpportunities(opportunityCategory));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Opportunities');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SendRsvp = async (data: any) => {
  try {
    const response = await Instance.post(Endpoints.sendRsvp, data, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });
    return response.data;
  } catch (error) {
    console.error('Error during sending Rsvp:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during sending Rsvp';
    throw new Error(errorMessage);
  }
};

export const LogOut = async () => {
  try {
    const response = await Instance.post(Endpoints.logOut);
    return response.data;
  } catch (error) {
    console.error('Error during signing out:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during signing out';
    throw new Error(errorMessage);
  }
};

export const GetVipRsvpEvents = async () => {
  try {
    const response = await Instance.get(Endpoints.getVipRsvpEvents);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Events');
  }
};

export const GetVipWishlistItems = async () => {
  try {
    const response = await Instance.get(Endpoints.getWishlistItems);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch wishlisted items');
  }
};

export const GetAddresses = async () => {
  try {
    const response = await Instance.get(Endpoints.getAddresses);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Opportunities');
  }
};

export const addUpdateAddress = async (address: AddressInput, addressId: string | undefined) => {
  try {
    let url = `${Endpoints.getAddresses}`;
    if (addressId) url = `${Endpoints.getAddresses}/${addressId}`;
    const response = await Instance.post(url, address);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during adding address';
    throw new Error(errorMessage);
  }
};

export const DeleteAddress = async (addressId: string) => {
  try {
    const response = await Instance.delete(Endpoints.deleteAddress(addressId));
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during deleting address';
    throw new Error(errorMessage);
  }
};

export const GetVipOpportunityDetails = async (id: number) => {
  try {
    const response = await Instance.get(Endpoints.getVipOpportunityDetails(id));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Opportunity Details');
  }
};

export const OrderFeedback = async (orderNumber: number, data: OrderFeedbackData) => {
  try {
    const response = await Instance.post(Endpoints.orderFeedback(orderNumber), data);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during sending Rsvp';
    throw new Error(errorMessage);
  }
};

export const AddItemToCart = async (id: number) => {
  try {
    const addItemResponse = await Instance.post(Endpoints.addItemToCart(id));
    return addItemResponse.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during adding item to cart';
    throw new Error(errorMessage);
  }
};

export const FetchCartItems = async () => {
  try {
    const response = await Instance.get(Endpoints.getVipCart);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Cart Content');
  }
};

export const EventFeedback = async (eventId: number, data: EventFeedbackData) => {
  try {
    const response = await Instance.post(Endpoints.eventFeedback(eventId), data);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during submitting Feedback';
    throw new Error(errorMessage);
  }
};

export const AddToWishlist = async (postId: number) => {
  try {
    const response = await Instance.post(Endpoints.addToWishlist(postId));
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during adding to wishlist';
    throw new Error(errorMessage);
  }
};

export const DeleteFromWishlist = async (postId: number) => {
  try {
    const response = await Instance.delete(Endpoints.addToWishlist(postId));
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during deleting from wishlist';
    throw new Error(errorMessage);
  }
};

export const ReferaVIP = async (data: { email: string; instagram_handle: string; tiktok_handle: string }) => {
  try {
    const response = await Instance.post(Endpoints.referVIP, data);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during referring a VIP';
    throw new Error(errorMessage);
  }
};

export const MakeRequestSubmit = async (data: { request_content: string }) => {
  try {
    const response = await Instance.post(Endpoints.makeRequest, data);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during making a request';
    throw new Error(errorMessage);
  }
};

export const GetPageContent = async (slug: string) => {
  try {
    const response = await Instance.get(Endpoints.getPageContent(slug));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch page content');
  }
};

export const GetAllVips = async () => {
  try {
    const response = await Instance.get(Endpoints.getAllVip);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Vips');
  }
};

export const GetMenuItems = async () => {
  try {
    const response = await Instance.get(Endpoints.getMenuItems);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Menu Items');
  }
};

export const VerifyEmail = async (email: string) => {
  try {
    const response = await Instance.post(Endpoints.verifyEmail, { email });
    return response.data;
  } catch (error) {
    console.error('Error during signing out:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during signing out';
    throw new Error(errorMessage);
  }
};

export const GetOpportunityCategory = async () => {
  try {
    const response = await Instance.get(Endpoints.GetOpportunityCategory);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Vips');
  }
};
