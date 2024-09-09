export type VipSignUpRequestBody = {
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

export interface SignupContent {
  vip_intro_copy: string;
  agent_intro_copy: string;
  brand_intro_copy: string;
  representation_options: string[];
  business_options: string[];
}
