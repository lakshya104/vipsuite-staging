import { UserRole } from '@/helpers/enums';

export interface ChildInfo {
  gender: string | null;
  dob: string | null;
}

export interface ContactInfo {
  email?: string;
  secondary_email?: string;
  contact_me_directly: boolean;
}

export interface ACF {
  brand_name?: string;
  type_of_business?: string;
  city?: string;
  gender?: string;
  first_name: string;
  last_name: string;
  created_by?: number;
  created_by_type?: string;
  email?: string;
  company_name?: string;
  type_of_representation?: string;
  avg_engagement_instagram?: string | null;
  avg_engagement_tiktok?: string | null;
  instagram_handle?: string;
  tiktok_handle?: string;
  event_contacts?: ContactInfo;
  stylist_contacts?: ContactInfo;
  commercial_opportunities_contacts?: ContactInfo;
  contact_me_directly?: boolean;
  date_of_birth?: string;
  number_of_children?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  examples_of_vip_managed?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  child_info?: any;
  associated_brands?: boolean;
  secondary_email?: string | null;
  phone?: string;
  profile_status?: string;
  instagram_follower_count?: number;
  tiktok_follower_count?: number;
}

export interface UserProfile {
  id?: number;
  email?: string;
  name?: string;
  acf: ACF;
  profile_id?: number;
  account_status?: string;
  role?: UserRole;
}

export interface AuthToken {
  token: string;
}

export type Session = {
  id: number;
  acf: ACF;
  profile_id: number;
  account_status: string;
  role: UserRole;
  email: string;
  token: string;
  first_name: string;
  last_name: string;
  is_profile_builder_progressed?: number;
  is_profile_completed?: number;
  last_login_at: string;
  brand_name: string;
  vip_profiles_count?: number;
};
