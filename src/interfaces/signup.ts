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
