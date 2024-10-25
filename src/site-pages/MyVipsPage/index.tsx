import React from 'react';
import { GetAllVips } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import MyVipsListing from '@/components/MyVipsListing';
import { ProfileStatus } from '@/helpers/enums';

export interface MyVips {
  vip_profile_id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
  profile_status: ProfileStatus;
  instagram_follower_count: string;
  tiktok_follower_count: string;
}

const MyVipPage = async () => {
  const myVips: MyVips[] = await GetAllVips();
  if (!myVips || myVips.length === 0) {
    return (
      <ErrorFallback
        errorMessage="Your VIP list is currently empty. Please consider adding someone to it."
        hideSubtext={true}
      />
    );
  }
  return <MyVipsListing myVips={myVips} />;
};

export default MyVipPage;
