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
  RsvpFormValues,
  AgentEditFormDataObject,
  BrandEditFormDataObject,
} from '@/interfaces';
import { Endpoints } from './constants';
import { LoginFormValues } from '@/features/LoginForm/loginTypes';
import { auth } from '@/auth';
import { Instance, InstanceWithoutHeaders, InstanceWithTokenOnly } from './instance';
import { Question } from '@/interfaces/events';
import { EditSocialLinksRequestBody } from '@/components/ProfileComponents/types';
import { UserRole } from '@/helpers/enums';

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
  try {
    const session = await auth();
    const id = (session?.user as unknown as Session)?.profile_id || null;
    if (!id) {
      throw new Error('User ID not found in session');
    }
    return { data: id, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : 'Failed to fetch User ID' };
  }
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
    id: user?.profile_id,
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
    userId: user?.profile_id,
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

export const AgentProfileUpdate = async (agentId: number, formData: AgentEditFormDataObject, token: string) => {
  try {
    const response = await InstanceWithoutHeaders.post(Endpoints.agentProfileUpdate(agentId), formData, {
      headers: {
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
    const response = await InstanceWithoutHeaders.post(Endpoints.login, data);
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
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetAgentProfile = async (token: string) => {
  try {
    const response = await InstanceWithoutHeaders.get(Endpoints.getProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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
        'profile-id': vipId?.toString(),
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

export const GetDashboard = async () => {
  try {
    const response = await Instance.get(Endpoints.getDashboard);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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

export const GetBrandProductDetail = async (oppId: number, id: number) => {
  try {
    const response = await Instance.get(Endpoints.getBrandProductDetails(oppId, id));
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetProducts = async () => {
  try {
    const response = await Instance.get(Endpoints.getProducts);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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

export const GetVipEvents = async (search?: string) => {
  try {
    const response = await Instance.get(Endpoints.getVipEvents(search));
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetProfileBuilderContent = async () => {
  try {
    const response = await Instance.get(Endpoints.getProfileBuilderContent);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const UpdateProfile = async (id: number, profile: UserProfile) => {
  try {
    const response = await InstanceWithTokenOnly.post(`${Endpoints.updateProfile}/${id}`, profile);
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
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetOrderById = async (id: number) => {
  try {
    const response = await Instance.get(Endpoints.getOrderById(id));
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetVipEventDetails = async (id: number) => {
  try {
    const response = await Instance.get(`${Endpoints.getVipEventDetails(id)}?_fields=id,title,acf`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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

export const RemoveVipCartItem = async (id: number, payload: { opportunity_id: string }) => {
  try {
    const response = await Instance.delete(Endpoints.removeVipCartItem(id), { data: payload });
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

export const GetVipOpportunities = async (opportunityCategory?: string, search?: string) => {
  try {
    const response = await Instance.get(Endpoints.getVipOpportunities(opportunityCategory, search));
    return {
      opportunities: response.data,
      error: null,
    };
  } catch (error) {
    return { opportunities: null, error };
  }
};

export const SendRsvp = async (data: RsvpFormValues) => {
  try {
    const response = await Instance.post(Endpoints.sendRsvp, data);
    return response.data;
  } catch (error) {
    console.error('Error during sending Rsvp:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during sending Rsvp';
    throw new Error(errorMessage);
  }
};

export const LogOut = async () => {
  try {
    const response = await InstanceWithTokenOnly.post(Endpoints.logOut);
    return response.data;
  } catch (error) {
    console.error('Error during signing out:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during signing out';
    throw new Error(errorMessage);
  }
};

export const DeleteAccount = async () => {
  try {
    const response = await InstanceWithTokenOnly.delete(Endpoints.deleteAccount);
    return response.data;
  } catch (error) {
    console.error('Error during Delete Account:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during delete account';
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

export const GetAddresses = async () => {
  try {
    const response = await Instance.get(Endpoints.getAddresses);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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

export const AddItemToCart = async (
  id: number,
  payload?: {
    product_id?: number;
    questions?: Question[];
    opportunity_id: string;
    vip_profile_ids?: string;
    vip_profile_names?: string;
    order_by?: UserRole;
  },
) => {
  try {
    const addItemResponse = await Instance.post(Endpoints.addItemToCart(id), payload);
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
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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

export const ReferaVIP = async (data: { email: string; instagram_handle?: string; tiktok_handle?: string }) => {
  try {
    const response = await Instance.post(Endpoints.referVIP, data);
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during referring a VIP';
    throw new Error(errorMessage);
  }
};

export const MakeRequestSubmit = async (data: FormData) => {
  try {
    const response = await Instance.post(Endpoints.makeRequest, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetAllVips = async () => {
  try {
    const response = await Instance.get(Endpoints.getAllVip);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
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
    console.error('Error sending Activation code:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during sending activation code';
    throw new Error(errorMessage);
  }
};
export const VerifyEmailCode = async (email: string, code: string) => {
  try {
    const response = await Instance.post(Endpoints.verifyEmailCode, { email, code });
    return response.data;
  } catch (error) {
    console.error('Error verifying code:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during sending activation code';
    throw new Error(errorMessage);
  }
};

export const GetOpportunityCategory = async () => {
  try {
    const response = await Instance.get(Endpoints.getOpportunityCategory);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Opportunity Categories');
  }
};

export const GetFormId = async (tag: string) => {
  try {
    const response = await InstanceWithoutHeaders.get(Endpoints.getFormId(tag));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch Form Id');
  }
};

export const SubmitLandingPageForm = async (id: string, formData: FormData) => {
  try {
    const response = await Instance.post(Endpoints.submitLandingPageForm(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error during form submission:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during form submission';
    throw new Error(errorMessage);
  }
};

export const GetOffers = async () => {
  try {
    const response = await Instance.get(Endpoints.getOffers);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetching Form Id');
  }
};

export const GetAllMessages = async () => {
  try {
    const response = await Instance.get(Endpoints.getMessages);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetMessageDetails = async (id: number) => {
  try {
    const response = await Instance.get(Endpoints.getMessageDetails(id));
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const SendMessage = async (id: number, payload: { message: string; order_id: number }) => {
  try {
    const response = await Instance.post(Endpoints.sendMessage(id), payload);
    return response.data;
  } catch (error) {
    console.error('Error during sending message:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during sending message';
    throw new Error(errorMessage);
  }
};

export const GetWebsiteContent = async () => {
  try {
    const response = await Instance.get(Endpoints.getWebsiteContent);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetComingSoonData = async () => {
  try {
    const response = await Instance.get(Endpoints.getComingSoonData);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const BrandProfileUpdate = async (agentId: number, formData: BrandEditFormDataObject) => {
  try {
    const response = await InstanceWithTokenOnly.post(Endpoints.agentProfileUpdate(agentId), formData);
    return response.data;
  } catch (error) {
    console.error('Error during sending message:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error during sending message';
    throw new Error(errorMessage);
  }
};

export const GetBrandProfile = async () => {
  try {
    const response = await InstanceWithTokenOnly.get(Endpoints.getProfile);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const ResetPasswordWithLogin = async ({
  password_reset_key,
  email,
  password,
}: {
  password_reset_key: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await Instance.post(Endpoints.resetPasswordWithLogin, { password_reset_key, email, password });
    return response.data;
  } catch (error) {
    console.error('Error during resetting password:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error during resetting password';
    throw new Error(errorMessage);
  }
};

export const LastLogin = async () => {
  try {
    const response = await InstanceWithTokenOnly.post(Endpoints.lastLogin);
    return response.data;
  } catch (error) {
    console.error('Error during updating status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error during updating status';
    throw new Error(errorMessage);
  }
};

export const GetProfileBuilder = async () => {
  try {
    const response = await Instance.get(Endpoints.getProfileBuilder);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetMessageCount = async () => {
  try {
    const response = await Instance.get(Endpoints.getMessageCount);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const GetShippingCountries = async () => {
  try {
    const response = await InstanceWithoutHeaders.get(Endpoints.getCountries);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const UpdateSocials = async (formData: EditSocialLinksRequestBody) => {
  try {
    const response = await Instance.post(Endpoints.updateSocials, formData);
    return response.data;
  } catch (error) {
    console.error('Error during updating Social Links:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during updating socials';
    throw new Error(errorMessage);
  }
};
