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

export type BrandSignUpRequestBody = {
  brand_name: string;
  contact_name: string;
  email: string;
  password: string;
  phone: string;
  type_of_business: string;
};

export type AgentSignUpRequestBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  company_name: string;
  examples_of_vip_managed: string[];
};
