'use client';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import MyVipCard from './MyVipCard';
import { MyVips } from '@/site-pages/MyVipsPage';
import revalidatePathAction, { revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';

interface MyVipsListingProps {
  myVips: MyVips[];
}
const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips }) => {
  useEffect(() => {
    const revalidate = async () => {
      await revalidateTag(TAGS.GET_DASHBOARD);
      revalidatePathAction('/agent-home');
    };
    revalidate();
  }, []);

  return (
    <Box>
      {myVips.map((item) => {
        const link =
          item.profile_status === 'pending' ? `/agent-profile-builder?vipId=${item?.vip_profile_id}` : `/agent-home`;
        const name = `${item?.first_name} ${item?.last_name}`;
        return (
          <MyVipCard
            vipId={String(item.vip_profile_id)}
            key={item.vip_profile_id}
            name={name}
            image={item.profile_image}
            link={link}
            instaFollowers={'100k'}
            tiktokFollowers={'50k'}
            status={item.profile_status}
          />
        );
      })}
    </Box>
  );
};

export default MyVipsListing;
