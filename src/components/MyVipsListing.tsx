'use client';
import React from 'react';
import { Box } from '@mui/material';
import MyVipCard from './MyVipCard';
import { MyVips } from '@/site-pages/MyVipsPage';
import { ProfileStatus } from '@/helpers/enums';

interface MyVipsListingProps {
  myVips: MyVips[];
}

const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips }) => {
  return (
    <Box>
      {myVips.map((item) => {
        const link = item.profile_status === ProfileStatus.Pending ? `/agent-profile-builder?edit=true` : `/home`;
        const name = `${item?.first_name} ${item?.last_name}`;
        return (
          <MyVipCard
            vipId={String(item?.vip_profile_id)}
            key={item?.vip_profile_id}
            name={name}
            image={item?.profile_image}
            link={link}
            instaFollowers={Number(item?.instagram_follower_count)}
            tiktokFollowers={Number(item?.tiktok_follower_count)}
            status={item?.profile_status}
          />
        );
      })}
    </Box>
  );
};

export default MyVipsListing;
