import { ProfileStatus } from '@/helpers/enums';

export interface MyVips {
  profile_id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
  profile_status: ProfileStatus;
  instagram_follower_count: string;
  tiktok_follower_count: string;
}
