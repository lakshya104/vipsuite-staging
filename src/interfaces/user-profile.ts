export interface ChildInfo {
  gender: string | null;
  dob: string | null;
}

export interface ContactInfo {
  email: string;
  secondary_email: string;
}

export interface ACF {
  first_name: string;
  last_name: string;
  created_by?: number;
  created_by_type?: string;
  type_of_representation?: string;
  avg_engagement?: string | null;
  instagram_handle?: string;
  tiktok_handle?: string;
  known_for?: string[];
  event_contacts?: ContactInfo;
  stylist_contacts?: ContactInfo;
  gifting_contacts?: ContactInfo;
  date_of_birth?: string;
  birth_place?: string;
  nationality?: string;
  ethnicity?: string;
  number_of_children?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  child_info?: any;
  pets?: string;
  home_post_code?: string;
  habits?: string[];
  sports_play?: string;
  other_sports?: string;
  sports_follow?: string;
  skills?: string;
  look_feel_of_socials?: string;
  interests?: string[];
  associated_brands?: boolean;
  secondary_email?: string | null;
  phone?: string;
  profile_status?: string;
}

export interface UserProfile {
  id?: number;
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
  role: string;
  token: string;
};
