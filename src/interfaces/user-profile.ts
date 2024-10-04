import { UserRole } from '@/helpers/enums';

export interface ChildInfo {
  gender: string | null;
  dob: string | null;
}

export interface ContactInfo {
  email: string;
  secondary_email: string;
  contact_me_directly: boolean;
}

export interface ACF {
  first_name: string;
  last_name: string;
  created_by?: number;
  created_by_type?: string;
  email?: string;
  company_name?: string;
  type_of_representation?: string;
  avg_engagement?: string | null;
  instagram_handle?: string;
  tiktok_handle?: string;
  known_for?: string[];
  event_contacts?: ContactInfo;
  stylist_contacts?: ContactInfo;
  gifting_contacts?: ContactInfo;
  contact_me_directly?: boolean;
  date_of_birth?: string;
  birth_place?: string;
  nationality?: string | null;
  ethnicity?: string | null;
  number_of_children?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  examples_of_vip_managed?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  child_info?: any;
  pets?: string;
  home_post_code?: string;
  habits?: string[];
  sports_play?: string | null;
  other_sports?: string;
  sports_follow?: string | null;
  skills?: string | null;
  look_feel_of_socials?: string | null;
  interests?: string[];
  associated_brands?: boolean;
  secondary_email?: string | null;
  phone?: string;
  profile_status?: string;
  type_of_content_create?: string[];
  instagram_follower_count?: number;
  tiktok_follower_count?: number;
}

export interface UserProfile {
  id?: number;
  email?: string;
  name?: string;
  acf: ACF;
  vip_profile_id?: number;
  account_status?: string;
  role?: string;
}

export interface AuthToken {
  token: string;
}

export type Session = {
  id: number;
  acf: ACF;
  vip_profile_id: number;
  account_status: string;
  role: UserRole;
  email: string;
  token: string;
};
