export type SignUpRequestBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  secondary_email?: string;
  phone: string;
  user_type: string;
  instagram_handle?: string;
  tiktok_handle?: string;
};

export type SignUpResponse = {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};
